const { ValidationError } = require('express-json-validator-middleware');

module.exports = (err, req, res, next) => {
  let responseData;

  if (err instanceof ValidationError) {
    // Log the error however you please
    console.log(err.message);

    responseData = {
      statusText: 'Bad Request',
      jsonSchemaValidation: true,
      validations: err.validationErrors, // All of your validation information
    };

    res.status(400).json(responseData);
  } else {
    next(err);
  }
};
