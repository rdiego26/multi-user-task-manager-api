const healthCheckRoutes = require('./healthCheckRoutes');
const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');

module.exports = (app) => {
  healthCheckRoutes(app);
  loginRoutes(app);
  userRoutes(app);
  projectRoutes(app);
	taskRoutes(app);
};
