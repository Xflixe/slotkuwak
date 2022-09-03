const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {

    const proxy = {
        //target: 'http://192.168.1.16:8072',
        //target: 'https://www.planetaxbet.com',
        //target: 'http://10.8.0.6:8072',
        target: 'http://staging.planetaxbet.com',
        //target: 'http://127.0.0.1:8072',
        //target: 'http://192.168.30.50:8072',
        //target: 'http://192.168.10.34:8072',
        logLevel:"debug",
        changeOrigin: true,
    }
    const proxyPromo = {
        target: 'https://www.planetaxbet.com/',
        logLevel:"debug",
        changeOrigin: true,
    }

    app.use(
        '/ss/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/os/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/us/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/us/v2',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/ws/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/wsd/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/ps/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/promos',
        createProxyMiddleware(proxyPromo)
    );
};
