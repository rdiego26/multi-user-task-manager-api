const { StatusCodes } = require('http-status-codes');
const UserService = require('../services').UserService;
const SessionService = require('../services').SessionService;

module.exports = {

  create: async (req, res) => {
    try {
      const item = req.body;
      let createdUser = await UserService.create(item);

      return res.status(StatusCodes.OK).json(createdUser);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },

	me: async (req, res) => {
		try {
			const token = req.headers['x-access-token'] || '';
			const fetchedData = await SessionService.fetchUserData(token);

			return res.status(StatusCodes.OK).json(fetchedData);
		} catch (error) {
			console.log(error);
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
		}
	},

};
