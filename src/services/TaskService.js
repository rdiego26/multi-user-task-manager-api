class TaskService {
	constructor(taskModel) {
		this.taskModel = taskModel;
	}

	async create(item) {
		return this.taskModel
			.scope('create')
			.create(item);
	}

	async update(newData, id) {
		const query = {
			id,
		};

		return this.taskModel.update(newData, {
			where: query,
			returning: true,
			plain: true,
		});
	}

}

module.exports = TaskService;
