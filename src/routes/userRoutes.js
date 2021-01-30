module.exports = (app) => {
  const controller = require('../controllers/userController');
  const router = require('express').Router();
	const { Validator } = require('express-json-validator-middleware');
	const { validate } = new Validator();
	const createSchema = require('../jsonSchemas/user/create');

  router.post('/api/user', validate({ body: createSchema }), controller.create);

  app.use(router);
};
