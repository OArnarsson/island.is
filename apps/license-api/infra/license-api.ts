import { ref, service, ServiceBuilder } from '../../../infra/src/dsl/dsl'
import { Base, Client } from '../../../infra/src/dsl/xroad'

export const serviceSetup = (): ServiceBuilder<'license-api'> =>
  service('license-api')
    .namespace('license-api')
    .resources({
      limits: { cpu: '400m', memory: '512Mi' },
      requests: { cpu: '200m', memory: '256Mi' },
    })
    .env({
      SMART_SOLUTIONS_API_URL: '/k8s/api/SMART_SOLUTIONS_API_URL',
      RLS_PKPASS_API_KEY: '/k8s/api/RLS_PKPASS_API_KEY',
      FIREARM_LICENSE_PASS_TEMPLATE_ID:
        '/k8s/api/FIREARM_LICENSE_PASS_TEMPLATE_ID',
      TR_PKPASS_API_KEY: '/k8s/api/TR_PKPASS_API_KEY',
      DISABILITY_LICENSE_PASS_TEMPLATE_ID:
        '/k8s/DISABILITY_LICENSE_PASS_TEMPLATE_ID',
      SI_PUBLIC_IDENTITY_SERVER_ISSUER_URL: {
        dev: 'https://identity-server.dev01.devland.is',
        staging: 'https://identity-server.staging01.devland.is',
        prod: 'https://innskra.island.is',
      },
      SI_PUBLIC_ENVIRONMENT: ref((h) => h.env.type),
    })
    .secrets({
      IDENTITY_SERVER_CLIENT_SECRET:
        '/k8s/download-service/IDENTITY_SERVER_CLIENT_SECRET',
    })
    .xroad(Base, Client)
    .ingress({
      primary: {
        host: {
          dev: ['beta'],
          staging: ['beta'],
          prod: ['', 'www.island.is'],
        },
        paths: ['/license-api'],
        public: true,
        extraAnnotations: {
          dev: {},
          staging: {
            'nginx.ingress.kubernetes.io/enable-global-auth': 'false',
          },
          prod: {},
        },
      },
    })
    .liveness('/liveness')
    .readiness('/readiness')
    .grantNamespaces('nginx-ingress-external', 'api-catalogue')
