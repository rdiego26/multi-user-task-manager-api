module.exports = {
	type: 'object',
	required: ['description'],
	properties: {
		description: {
			description: 'Description of task',
			type: 'string',
		},
		finishedAt: {
			description: 'Datetime when the task was completed',
			type: 'string',
			format: 'date-time',
		},
	},
};

