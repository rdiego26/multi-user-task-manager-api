const Sequelize = require('sequelize');
const connection = require('../utils/poolConnection');
const ProjectModel = require('./ProjectModel').init(connection, Sequelize.DataTypes);

class UserModel extends Sequelize.Model {
	static init(sequelize, DataTypes) {

		let model = super.init(
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
					type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true,
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
					relation: {
						attributes: ['name', 'email', 'createdAt'],
					},
					find: {
						attributes: ['id', 'name', 'email', 'createdAt'],
					}
				}
			}
		);

		model.hasMany(ProjectModel, { as: 'projects' });
		return model;
	}
}

module.exports = UserModel;
