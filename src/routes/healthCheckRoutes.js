module.exports = (app) => {
  const controller = require('../controllers/healthCheckController');
  const router = require('express').Router();

  router.get('/api/healthCheck', controller.checkHealth);

  app.use(router);
};
