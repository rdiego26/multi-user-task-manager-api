module.exports = {
	type: 'object',
	required: ['name'],
	properties: {
		name: {
			description: 'Name of task',
			type: 'string',
		},
		deletedAt: {
			description: 'Datetime when the task was deleted',
			type: 'string',
			format: 'date-time',
		},
	},
};

