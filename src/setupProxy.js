const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
   app.use(
      '/api', // The path you want to proxy to your Express app
      createProxyMiddleware({
         target: 'http://localhost:8000', // Set the address of your Express app
         changeOrigin: true,
      })
   )
}
