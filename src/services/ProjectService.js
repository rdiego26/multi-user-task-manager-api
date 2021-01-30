class ProjectService {
	constructor(projectModel) {
		this.projectModel = projectModel;
	}

	async create(item) {
    return this.projectModel
        .scope('create')
        .create(item);
  }

  async update(newData, id) {
    const query = {
        id,
    };

	  return this.projectModel.update(newData, {
		  where: query,
		  returning: true,
		  plain: true,
	  });
  }

}

module.exports = ProjectService;
