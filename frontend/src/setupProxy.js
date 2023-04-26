const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '^/api',
    createProxyMiddleware({
      target: 'https://akludo.com',  //https:localhost:3000
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