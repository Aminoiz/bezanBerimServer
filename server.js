const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const expressValidator = require('express-validator');
var useragent = require('express-useragent');
global.config = require('./modules/config');

// MongoDB openshift
var mongoUser =  process.env.MONGODB_USER,
    mongoDatabase = process.env.MONGODB_DATABASE,
    mongoPassword = process.env.MONGODB_PASSWORD,
    mongoHost = process.env.TAXCALCDB_SERVICE_HOST,
    mongoPort = process.env.TAXCALCDB_SERVICE_PORT,
    mongoURL = 'mongodb://';

mongoURL += mongoUser + ':' + mongoPassword + '@';
mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
//

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({ type : 'application/json' }));
app.use(expressValidator());
app.use(useragent.express());
app.use('/public' , express.static('public'))

const appApiRouter = require('./modules/routes/appApi');
const webApiRouter = require('./modules/routes/webApi');
const adminApiRouter = require('./modules/routes/adminApi');
const webRouter = require('./modules/routes/web');

app.use('/api/appApi' , appApiRouter)
app.use('/api/webApi/', webApiRouter)
app.use('/api/adminApi/', adminApiRouter)
app.use('/' , webRouter);

app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});
