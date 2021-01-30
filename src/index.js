'use strict';
const constants = require('./utils/constants');

const http = require('http');
const express = require('express');
const helmet = require('helmet')();
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const securityMiddleware = require('../src/middlewares/securityMiddleware');
const jsonSchemaValidationMiddleware = require('../src/middlewares/jsonSchemaValidationMiddleware');

const routes = require('./routes/healthCheckRoutes');

const app = express();
app.set('port', constants.server.port);
app.set('title', constants.app.name);

app.use(helmet);
app.use(bodyParser.json({limit: '1mb'}));
app.use(compression());


app.all('/api/*', cors());
app.all('/api/*', securityMiddleware.checkToken);

routes(app);

// This middleware should be the last
app.use(jsonSchemaValidationMiddleware);

http.createServer(app).listen(app.get('port'), () => {
	console.info('%s listening on port %d', app.get('title'), app.get('port'));
});

module.exports = app;
