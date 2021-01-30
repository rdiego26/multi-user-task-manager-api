module.exports = {
	type: 'object',
	required: ['userId', 'name'],
	properties: {
		userId: {
			description: 'User UUID',
			type: 'string',
		},
		name: {
			description: 'Name of project',
			type: 'string',
		},
	},
};

