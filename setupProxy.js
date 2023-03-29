const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/cms',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );
};