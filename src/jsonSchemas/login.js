module.exports = {
	type: 'object',
	required: ['email', 'password'],
	properties: {
		email: {
			description: 'Name of user',
			type: 'string',
			format: 'email',
		},
		password: {
			description: 'Password of user',
			type: 'string',
		},
	},
};
