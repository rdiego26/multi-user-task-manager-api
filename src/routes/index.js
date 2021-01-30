const healthCheckRoutes = require('./healthCheckRoutes');
const loginRoutes = require('./loginRoutes');

module.exports = (app) => {
  healthCheckRoutes(app);
  loginRoutes(app);
};
