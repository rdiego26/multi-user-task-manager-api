const healthCheckRoutes = require('./healthCheckRoutes');
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');

module.exports = (app) => {
  healthCheckRoutes(app);
  loginRoutes(app);
  userRoutes(app);
};
