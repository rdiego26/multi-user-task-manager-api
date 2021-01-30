module.exports = {
	type: 'object',
	required: ['projectId', 'description'],
	properties: {
		projectId: {
			description: 'Project UUID',
			type: 'string',
		},
		description: {
			description: 'Description of project',
			type: 'string',
		},
	},
};

