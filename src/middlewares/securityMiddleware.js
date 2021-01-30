const sessionServiceInstance = require('../services').SessionService;

module.exports = {
  checkToken: async (req, res, next) => {
    const token = req.headers['x-access-token'] || null;
    const requestURL = req.originalUrl;

    if (requestURL === '/api/healthCheck' || requestURL === '/api/login') {
      next();
    } else if (!token) {
      res.status(401).end();
    } else {
      const fetchedData = await sessionServiceInstance.findActiveToken(token);

      if (!fetchedData) {
        res.status(401).end();
      } else {
        await sessionServiceInstance.increment(fetchedData);
        next();
      }
    }
  },
};
