module.exports = (app) => {
  const controller = require('../controllers/taskController');
  const router = require('express').Router();
	const { Validator } = require('express-json-validator-middleware');
	const { validate } = new Validator();
	const createSchema = require('../jsonSchemas/task/create');
	const updateSchema = require('../jsonSchemas/task/update');

  router.post('/api/task', validate({ body: createSchema }), controller.create);
	router.put('/api/task/:id', validate({ body: updateSchema }), controller.update);

  app.use(router);
};
