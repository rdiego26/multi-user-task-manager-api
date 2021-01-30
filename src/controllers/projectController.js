const { StatusCodes } = require('http-status-codes');
const ProjectService = require('../services').ProjectService;

module.exports = {

  create: async (req, res) => {
    try {
      const item = req.body;
      let createdProject = await ProjectService.create(item);

      return res.status(StatusCodes.OK).json(createdProject);
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },

	update: async (req, res) => {
		try {
			const data = req.body;
			const id = req.params.id;
			let updatedProject = await ProjectService.update(data, id);

			return res.status(StatusCodes.OK).json(updatedProject);
		} catch (error) {
			console.log(error);
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
		}
	},

};
