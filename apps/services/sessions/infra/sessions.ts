import { json, service, ServiceBuilder } from '../../../../infra/src/dsl/dsl'

const namespace = 'services-sessions'
const imageName = 'services-sessions'
const dbName = 'services_sessions'

const servicePostgresInfo = {
  // The service has only read permissions
  username: 'services_sessions_read',
  name: dbName,
  passwordSecret: '/k8s/services-sessions/readonly/DB_PASSWORD',
}

export const serviceSetup = (): ServiceBuilder<'services-sessions'> => {
  return service('services-sessions')
    .namespace(namespace)
    .image(imageName)
    .postgres(servicePostgresInfo)
    .env({
      IDENTITY_SERVER_ISSUER_URL: {
        dev: 'https://identity-server.dev01.devland.is',
        staging: 'https://identity-server.staging01.devland.is',
        prod: 'https://innskra.island.is',
      },
      REDIS_URL_NODE_01: {
        dev: json([
          'clustercfg.general-redis-cluster-group.5fzau3.euw1.cache.amazonaws.com:6379',
        ]),
        staging: json([
          'clustercfg.general-redis-cluster-group.ab9ckb.euw1.cache.amazonaws.com:6379',
        ]),
        prod: json([
          'clustercfg.general-redis-cluster-group.whakos.euw1.cache.amazonaws.com:6379',
        ]),
      },
      REDIS_USE_SSL: 'true',
    })
    .readiness('/liveness')
    .liveness('/liveness')
    .replicaCount({
      default: 1,
      min: 1,
      max: 10,
    })
    .resources({
      limits: {
        cpu: '400m',
        memory: '512Mi',
      },
      requests: {
        cpu: '100m',
        memory: '256Mi',
      },
    })
    .ingress({
      internal: {
        host: {
          dev: 'sessions-api',
          staging: 'sessions-api',
          prod: 'sessions-api',
        },
        paths: ['/'],
        public: false,
      },
    })
    .grantNamespaces('nginx-ingress-internal', 'islandis', 'identity-server')
}
