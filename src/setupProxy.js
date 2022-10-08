const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {

    const proxy = {
        target: 'http://192.168.1.29:8072',
        //target: 'http://192.168.1.20:8072',
        //target: 'https://www.planetaxbet.com',
        //target: 'http://10.8.0.6:8072',
        //target: 'https://staging.planetaxbet.com',
        //target: 'http://127.0.0.1:8072',
        //target: 'http://192.168.30.50:8072',
        //target: 'http://192.168.10.34:8072',
        logLevel:"debug",
        changeOrigin: true,
    }
    const proxyPromo = {
        //target: 'https://www.planetaxbet.com/',
        target: 'https://slotmaster.com:8888',
        //target: 'https://staging.planetaxbet.com',
        //target: 'https://zur.planetaxbet.com',
        logLevel:"debug",
        secure:false,
        changeOrigin: true,
    }

    const proxyTournaments = {
        //target: 'https://www.planetaxbet.com/',
        target: 'http://192.168.1.29:8072',
        //target: 'https://staging.planetaxbet.com',
        //target: 'https://zur.planetaxbet.com',
        logLevel:"debug",
        secure:false,
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
    app.use(
        '/ts',
        createProxyMiddleware(proxyPromo)
    );
    app.use(
        '/tournaments/',
        createProxyMiddleware(proxyPromo)
    );

    app.use(
        '/ws',
        createProxyMiddleware(proxyTournaments)
    );

    app.use(
        '/st/v1',
        createProxyMiddleware({...proxyTournaments,
            //pathRewrite: {"/st": "/"}
        })
    );
    app.use(
        '/st/ws',
        createProxyMiddleware({...proxyTournaments,
            //pathRewrite: {"/st": "/"}
        })
    );

};
