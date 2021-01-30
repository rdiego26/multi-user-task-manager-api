module.exports = {
	type: 'object',
	required: ['name', 'email', 'password'],
	properties: {
		name: {
			description: 'Name of user',
			type: 'string',
		},
		email: {
			description: 'Email of user',
			type: 'string',
			format: 'email',
		},
		password: {
			description: 'Password of user',
			type: 'string',
		}
	},
};

