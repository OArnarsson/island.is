const path = require('path')
const withNx = require('@nrwl/next/plugins/with-nx')
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default
const { DuplicatesPlugin } = require('inspectpack/plugin')

const graphqlPath = '/api/graphql'
const {
  API_URL = 'http://localhost:4444',
  DISABLE_API_CATALOGUE,
  DD_RUM_APPLICATION_ID,
  DD_RUM_CLIENT_TOKEN,
  APP_VERSION,
  ENVIRONMENT,
  CONFIGCAT_SDK_KEY,
} = process.env

module.exports = withNx(
  withVanillaExtract({
    async rewrites() {
      return [
        {
          source: '/umsoknir/:slug',
          destination: 'https://island.is/umsoknir/:slug',
        },
        {
          source: '/rss.xml',
          destination: '/api/rss',
        },
        {
          source: '/opinbernyskopun/rss.xml',
          destination: '/api/rss/opinbernyskopun',
        },
      ]
    },
    webpack: (config, { isServer }) => {
      if (process.env.ANALYZE === 'true' && !isServer) {
        config.plugins.push(
          new DuplicatesPlugin({
            emitErrors: false,
            verbose: true,
          }),
        )

        config.plugins.push(
          new StatoscopeWebpackPlugin({
            saveTo: 'dist/apps/web/statoscope.html',
            saveStatsTo: 'dist/apps/web/stats.json',
            statsOptions: { all: true, source: false },
          }),
        )

        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: isServer
              ? '../analyze/server.html'
              : './analyze/client.html',
          }),
        )
      }

      const modules = path.resolve(__dirname, '../..', 'node_modules')

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@babel/runtime': path.resolve(modules, '@babel/runtime'),
        'bn.js': path.resolve(modules, 'bn.js'),
        'date-fns': path.resolve(modules, 'date-fns'),
        'es-abstract': path.resolve(modules, 'es-abstract'),
        'escape-string-regexp': path.resolve(modules, 'escape-string-regexp'),
        'readable-stream': path.resolve(modules, 'readable-stream'),
        'react-popper': path.resolve(modules, 'react-popper'),
        inherits: path.resolve(modules, 'inherits'),
        'graphql-tag': path.resolve(modules, 'graphql-tag'),
        'safe-buffer': path.resolve(modules, 'safe-buffer'),
        scheduler: path.resolve(modules, 'scheduler'),
      }

      return config
    },

    cssModules: false,

    serverRuntimeConfig: {
      // Will only be available on the server side
      // Requests made by the server are internal request made directly to the api hostname
      graphqlUrl: API_URL,
      graphqlEndpoint: graphqlPath,
    },

    publicRuntimeConfig: {
      // Will be available on both server and client
      graphqlUrl: '',
      graphqlEndpoint: graphqlPath,
      disableApiCatalog: DISABLE_API_CATALOGUE,
      ddRumApplicationId: DD_RUM_APPLICATION_ID,
      ddRumClientToken: DD_RUM_CLIENT_TOKEN,
      appVersion: APP_VERSION,
      environment: ENVIRONMENT,
      configCatSdkKey: CONFIGCAT_SDK_KEY,
    },

    env: {
      API_MOCKS: process.env.API_MOCKS || '',
    },
  }),
)
