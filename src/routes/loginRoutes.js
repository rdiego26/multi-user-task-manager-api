module.exports = (app) => {
  const controller = require('../controllers/loginController');
  const router = require('express').Router();
	const { Validator } = require('express-json-validator-middleware');
	const { validate } = new Validator();
	const loginSchema = require('../jsonSchemas/login');

  router.post('/api/login', validate({ body: loginSchema }), controller.findByCredentials);

  app.use(router);
};
