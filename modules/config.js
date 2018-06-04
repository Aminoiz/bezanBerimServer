const path = require('path');

module.exports = {
    port : process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    secret : '&=L^XHy!MPw2e**#KAk3R@SMFT3nK+QGN2YkZkcaPPptEky4*PjhD@AaNz++*2Jr',
    path : {
        admin : {
            transform : path.resolve('./modules/transforms/adminApi'),
            controller : path.resolve('./modules/controllers/adminApi'),
        },
        web : {
            transform : path.resolve('./modules/transforms/webApi'),
            controller : path.resolve('./modules/controllers/webApi'),
        },
        app : {
            transform : path.resolve('./modules/transforms/appApi'),
            controller : path.resolve('./modules/controllers/appApi'),
        },
        model : path.resolve('./modules/models'),
    }
}
