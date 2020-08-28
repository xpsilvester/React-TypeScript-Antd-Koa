const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://localhost:3010', //配置你要请求的服务器地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': ""
        },
    }));
};