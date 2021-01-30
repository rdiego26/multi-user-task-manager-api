const Sequelize = require('sequelize');
const connection = require('../utils/poolConnection');
const UserModel = require('./UserModel').init(connection, Sequelize.DataTypes);

class SessionModel extends Sequelize.Model {
	static init(sequelize, DataTypes) {

		let model = super.init(
			{
				id: {
					type: DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.DataTypes.UUIDV4,
				},
				userId: {
					type: Sequelize.UUID,
					allowNull: false,
					field: 'user_id',
					references: {
						model: 'user',
						key: 'id',
					},
				},
				token: {
					type: Sequelize.TEXT, allowNull: false, unique: true,
				},
				expiresAt: {
					type: Sequelize.DATE, allowNull: false, defaultValue: sequelize.literal('NOW()'), field: 'expires_at',
				}
			},
			{
				sequelize,
				createdAt: false,
				updatedAt: false,
				tableName: 'session',
				scopes: {
					create: {
						attributes: ['userId', 'token', 'expiresAt'],
					},
					find: {
						attributes: ['userId', 'token', 'expiresAt'],
					},
				}
			}
		);

		model.belongsTo(UserModel, { as: 'user' });
		return model;
	}
}

module.exports = SessionModel;
