const { ValidationError } = require('express-json-validator-middleware');

const validationErrorDecorator = (error) => {
  return { message: error.message };
};

module.exports = (err, req, res, next) => {
  let responseData;

  if (err instanceof ValidationError) {
    // Log the error however you please
    console.log(err.message);

    responseData = {
      errors: (err.validationErrors?.body?.map(validationErrorDecorator) || []), // All of your validation information
    };

    res.status(400).json(responseData);
  } else {
    next(err);
  }
};
