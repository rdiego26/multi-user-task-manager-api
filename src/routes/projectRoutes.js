module.exports = (app) => {
  const controller = require('../controllers/projectController');
  const router = require('express').Router();
	const { Validator } = require('express-json-validator-middleware');
	const { validate } = new Validator();
	const createSchema = require('../jsonSchemas/project/create');
	const updateSchema = require('../jsonSchemas/project/update');

  router.post('/api/project', validate({ body: createSchema }), controller.create);
	router.put('/api/project/:id', validate({ body: updateSchema }), controller.update);

  app.use(router);
};
