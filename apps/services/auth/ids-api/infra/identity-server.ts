import { ref, service, ServiceBuilder } from '../../../../../infra/src/dsl/dsl'

/**
 * This setup is for the Identity Server, which is hosted in a different repository - https://github.com/island-is/identity-server.web
 */
export const serviceSetup = (services: {
  authIdsApi: ServiceBuilder<'services-auth-ids-api'>
}): ServiceBuilder<'identity-server'> => {
  return service('identity-server')
    .namespace('identity-server')
    .image('identity-server')
    .env({
      AWS__CloudWatch__AuditLogGroup: '/identity-server/audit-log',
      ASPNETCORE_URLS: 'http://*:5000',
      CORECLR_ENABLE_PROFILING: '1',
      CORECLR_PROFILER: '{846F5F1C-F9AE-4B07-969E-05C26BC060D8}',
      CORECLR_PROFILER_PATH: '/opt/datadog/Datadog.Trace.ClrProfiler.Native.so',
      DD_INTEGRATIONS: '/opt/datadog/integrations.json',
      DD_DOTNET_TRACER_HOME: '/opt/datadog',
      Datadog__Metrics__Port: '5003',
      AudkenniSettings__Retries: '24',

      AWS__SystemsManager__ParameterStore__DataProtectionPrefix: {
        dev: '/k8s/identity-server/DataProtectionSecret',
        staging: '/k8s/identity-server/DataProtectionSecret',
        prod: '/k8s/identity-server/DataProtectionSecret',
      },
      CacheSettings__Enabled: {
        dev: 'true',
        staging: 'true',
        prod: 'true',
      },
      CacheSettings__Memcached__Address: {
        dev: 'identity-server.5fzau3.cfg.euw1.cache.amazonaws.com',
        staging: 'identity-server.ab9ckb.cfg.euw1.cache.amazonaws.com',
        prod: 'identity-server.dnugi2.cfg.euw1.cache.amazonaws.com',
      },
      CacheSettings__Memcached__Port: {
        dev: '11211',
        staging: '11211',
        prod: '11211',
      },
      CacheSettings__Redis__Address: {
        dev:
          'clustercfg.general-redis-cluster-group.5fzau3.euw1.cache.amazonaws.com',
        staging:
          'clustercfg.general-redis-cluster-group.ab9ckb.euw1.cache.amazonaws.com',
        prod:
          'clustercfg.general-redis-cluster-group.dnugi2.euw1.cache.amazonaws.com',
      },
      CacheSettings__Redis__Port: {
        dev: '6379',
        staging: '6379',
        prod: '6379',
      },
      IdentityServer__EnableFakeLogin: {
        dev: 'true',
        staging: 'true',
        prod: 'true',
      },
      IdentityServer__EnableFeatureDeploymentWildcards: {
        dev: 'true',
        staging: 'true',
        prod: 'false',
      },
      IdentityServer__KeyManagement__Enabled: {
        dev: 'true',
        staging: 'true',
        prod: 'true',
      },
      PersistenceSettings__BaseAddress: ref(
        (h) => `http://${h.svc(services.authIdsApi)}`,
      ),
      PersistenceSettings__SessionsBaseAddress: {
        dev: 'http://web-services-sessions.services-sessions.svc.cluster.local',
        staging:
          'http://web-services-sessions.services-sessions.svc.cluster.local',
        prod: 'https://sessions-api.internal.island.is',
      },
      Application__MinCompletionPortThreads: '10',
      NO_UPDATE_NOTIFIER: 'true',
    })
    .secrets({
      IdentityServer__LicenseKey: '/k8s/identity-server/LicenseKey',
      AudkenniSettings__ClientId: '/k8s/identity-server/AudkenniClientId',
      AudkenniSettings__ClientSecret:
        '/k8s/identity-server/AudkenniClientSecret',
      IdentityServer__FakePersons: '/k8s/identity-server/FakePersons',
      IdentityServer__SigningCertificate__Passphrase:
        '/k8s/identity-server/SigningCertificatePassphrase',
      PersistenceSettings__AccessTokenManagementSettings__ClientSecret:
        '/k8s/identity-server/ClientSecret',
      Scopes__Admin__RootAccessList: '/k8s/identity-server/AdminRootAccessList',
      FeatureFlags__ConfigCatSdkKey: '/k8s/configcat/CONFIGCAT_SDK_KEY',
    })
    .ingress({
      primary: {
        host: {
          dev: 'identity-server',
          staging: 'identity-server',
          prod: 'innskra.island.is',
        },
        paths: ['/'],
        public: true,
        extraAnnotations: {
          dev: {
            'nginx.ingress.kubernetes.io/enable-global-auth': 'false',
            'nginx.ingress.kubernetes.io/proxy-buffering': 'on',
            'nginx.ingress.kubernetes.io/proxy-buffer-size': '8k',
          },
          staging: {
            'nginx.ingress.kubernetes.io/enable-global-auth': 'false',
            'nginx.ingress.kubernetes.io/proxy-buffering': 'on',
            'nginx.ingress.kubernetes.io/proxy-buffer-size': '8k',
          },
          prod: {
            'nginx.ingress.kubernetes.io/proxy-buffering': 'on',
            'nginx.ingress.kubernetes.io/proxy-buffer-size': '8k',
          },
        },
      },
    })
    .volumes({
      mountPath: '/keys',
      size: '1Gi',
      accessModes: 'ReadWrite',
    })
    .files({
      filename: 'ids-signing.pfx',
      env: 'IdentityServer__SigningCertificate__Path',
    })
    .resources({
      limits: {
        cpu: '4000m',
        memory: '2048Mi',
      },
      requests: {
        cpu: '1000m',
        memory: '1024Mi',
      },
    })
    .healthPort(5010)
    .targetPort(5000)
    .serviceAccount('identity-server')
    .readiness('/readiness')
    .liveness('/liveness')
    .extraAttributes({
      dev: {
        annotations: {
          'ad.datadoghq.com/identity-server.logs':
            '[{"service": "identity-server", "source": "csharp"}]',
          'ad.datadoghq.com/identity-server.check_names': '["openmetrics"]',
          'ad.datadoghq.com/identity-server.init_configs': '[{}]',
          'ad.datadoghq.com/identity-server.instances':
            '[{"prometheus_url": "http://%%host%%:5003/metrics","namespace": "identity-server","metrics":["*"]}]',
        },
      },
      staging: {
        annotations: {
          'ad.datadoghq.com/identity-server.logs':
            '[{"service": "identity-server", "source": "csharp"}]',
          'ad.datadoghq.com/identity-server.check_names': '["openmetrics"]',
          'ad.datadoghq.com/identity-server.init_configs': '[{}]',
          'ad.datadoghq.com/identity-server.instances':
            '[{"prometheus_url": "http://%%host%%:5003/metrics","namespace": "identity-server","metrics":["*"]}]',
        },
      },
      prod: {
        annotations: {
          'ad.datadoghq.com/identity-server.logs':
            '[{"service": "identity-server", "source": "csharp"}]',
          'ad.datadoghq.com/identity-server.check_names': '["openmetrics"]',
          'ad.datadoghq.com/identity-server.init_configs': '[{}]',
          'ad.datadoghq.com/identity-server.instances':
            '[{"prometheus_url": "http://%%host%%:5003/metrics","namespace": "identity-server","metrics":["*"]}]',
        },
      },
    })
}
