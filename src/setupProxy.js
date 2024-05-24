const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graph',
    createProxyMiddleware({
      target: process.env.BACKEND_API_ENDPOINT || 'http://qstand.art:8034/',
      changeOrigin: true,
    })
  );
};
