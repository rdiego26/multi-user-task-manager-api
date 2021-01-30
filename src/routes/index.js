const healthCheckRoutes = require('./healthCheckRoutes');
const sessionRoutes = require('./sessionRoutes');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');

module.exports = (app) => {
  healthCheckRoutes(app);
	sessionRoutes(app);
  userRoutes(app);
  projectRoutes(app);
	taskRoutes(app);
};
