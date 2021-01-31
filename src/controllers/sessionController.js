const { StatusCodes } = require('http-status-codes');
const SessionService = require('../services').SessionService;
const UserService = require('../services').UserService;

module.exports = {

  findByCredentials: async (req, res) => {
    try {
      const email = req.body.email || '';
      const password = req.body.password || '';

      let fetchedUser = await UserService.findWithCredentials(email, password);
      const code = fetchedUser ? StatusCodes.OK : StatusCodes.UNAUTHORIZED;
      let result;

      if (fetchedUser) {
          result = await SessionService.create(fetchedUser.id);
      }

      return res.status(code).json(result);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },

	logout: async (req, res) => {
		try {
		  const sessionToken = req.headers['x-access-token'];
			await SessionService.deleteByToken(sessionToken);

			return res.status(StatusCodes.OK).json(null);
		} catch (error) {
			console.log(error);
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
		}
	},

};
