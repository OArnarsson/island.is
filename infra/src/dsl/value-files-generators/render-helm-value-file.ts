import { Kubernetes } from '../kubernetes-runtime'
import { HelmValueFile, ServiceHelm, Services } from '../types/output-types'
import { renderers } from '../upstream-dependencies'

export type Mocks = 'with-mocks' | 'no-mocks'
export const renderHelmValueFile = (
  uberChart: Kubernetes,
  services: Services<ServiceHelm>,
  withMocks: Mocks,
): HelmValueFile => {
  const outputFormat = renderers.helm
  const helmServices: Services<ServiceHelm> = Object.entries(services).reduce(
    (acc, [name, service]) => {
      const extras = service.extra
      delete service.extra
      return {
        ...acc,
        [name]: Object.assign({}, service, extras),
      }
    },
    uberChart.env.global,
  )
  const mocks: Services<ServiceHelm> =
    withMocks === 'with-mocks' && Object.keys(uberChart.mocks).length > 0
      ? {
          'mock-server': outputFormat.serviceMockDef({
            uberChart,
          }),
        }
      : {}
  const servicesAndMocks = { ...helmServices, ...mocks }
  Object.values(servicesAndMocks)
    .filter((s) => s.grantNamespacesEnabled)
    .forEach(({ namespace, grantNamespaces }) =>
      Object.values(servicesAndMocks)
        .filter((s) => !s.grantNamespacesEnabled && s.namespace === namespace)
        .forEach((s) => {
          // Not cool but we need to change it after we've rendered all the services.
          // Preferably we would want to keep netpols somewhere else - away from the
          // application configuration.
          s.grantNamespacesEnabled = true
          s.grantNamespaces = grantNamespaces
        }),
    )
  return {
    namespaces: Array.from(
      Object.values(servicesAndMocks)
        .map((s) => s.namespace)
        .filter((n) => n)
        .reduce((prev, cur) => prev.add(cur), new Set<string>())
        .values(),
    ),
    services: servicesAndMocks,
  }
}