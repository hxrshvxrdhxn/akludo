const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '^/api',
    createProxyMiddleware({
      target: 'https://akludo.com',
      changeOrigin: true,
    })
  );
  app.use(
    '^/socket.io',
    createProxyMiddleware({
      target: 'https://akludo.com',
      changeOrigin: true,
    })
  );
};