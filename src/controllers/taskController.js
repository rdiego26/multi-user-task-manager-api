const { StatusCodes } = require('http-status-codes');
const TaskService = require('../services').TaskService;

module.exports = {

  create: async (req, res) => {
    try {
      const item = req.body;
      let createdTask = await TaskService.create(item);

      return res.status(StatusCodes.OK).json(createdTask);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },

	update: async (req, res) => {
		try {
			const data = req.body;
			const id = req.params.id;
			let updatedTask = await TaskService.update(data, id);

			return res.status(StatusCodes.OK).json(updatedTask);
		} catch (error) {
			console.log(error);
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
		}
	},

};
