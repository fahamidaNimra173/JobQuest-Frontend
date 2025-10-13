export default {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      ignored: ['**/node_modules/**', '**/.next/**'],
    };
    return config;
  },
};
