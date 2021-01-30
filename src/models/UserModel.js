const Sequelize = require('sequelize');

class UserModel extends Sequelize.Model {
	static init(sequelize, DataTypes) {

		return super.init(
			{
				id: {
					type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4,
				},
				name: {
					type: DataTypes.STRING(200), allowNull: false, unique: true,
					validate: {
						notEmpty: true,
					},
				},
				email: {
					type: DataTypes.STRING(100), allowNull: false, unique: true,
					validate: {
						notEmpty: true,
						isEmail: true,
					},
				},
				password: {
					type: DataTypes.TEXT, allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				createdAt: {
					type: DataTypes.DATE, field: 'created_at',
				},
				active: {
					type: DataTypes.BOOLEAN, allowNull: false, default: true,
				},
			},
			{
				sequelize,
				freezeTableName: true,
				createdAt: false,
				updatedAt: false,
				tableName: 'user',
				modelName: 'user',
				scopes: {
					create: {
						attributes: ['name', 'email', 'password'],
					},
					find: {
						attributes: ['id', 'name', 'email', 'createdAt'],
					}
				}
			}
		);
	}
}

module.exports = UserModel;
