const { StatusCodes } = require('http-status-codes');
const sessionServiceInstance = require('../services').SessionService;

const PUBLIC_ROUTES = ['/api/healthCheck', '/api/login'];

module.exports = {
  checkToken: async (req, res, next) => {
    const token = req.headers['x-access-token'] || null;
    const requestURL = req.originalUrl;
    const method = req.method;

    if (PUBLIC_ROUTES.includes(requestURL) || (requestURL === '/api/user' && method === 'POST')) {
      next();
    } else if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).end();
    } else {
      const fetchedData = await sessionServiceInstance.findActiveToken(token);

      if (!fetchedData) {
        res.status(StatusCodes.UNAUTHORIZED).end();
      } else {
        await sessionServiceInstance.increment(fetchedData);
        next();
      }
    }
  },
};
