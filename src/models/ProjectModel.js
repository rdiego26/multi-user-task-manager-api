const Sequelize = require('sequelize');
const connection = require('../utils/poolConnection');
const TaskModel = require('./TaskModel').init(connection, Sequelize.DataTypes);

class ProjectModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {

	    let model = super.init(
            {
                id: {
                    type: Sequelize.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4,
                },
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'user_id',
                    references: {
                        model: 'user',
                        key: 'id',
                    },
                },
                name: {
                    type: DataTypes.STRING(200), allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE, field: 'created_at',
                },
                deletedAt: {
                  type: DataTypes.DATE, field: 'deleted_at',
                },
            },
            {
                sequelize,
                freezeTableName: true,
                createdAt: false,
                updatedAt: false,
                tableName: 'project',
                scopes: {
                    create: {
                        attributes: ['userId', 'name'],
                    },
                    update: {
                      attributes: ['name', 'deletedAt'],
                    },
                    relation: {
                      attributes: ['id', 'name', 'createdAt', 'deletedAt'],
                    },
                    find: {
                        attributes: ['userId', 'name', 'createdAt', 'deletedAt'],
                    },
                },
            }
        );

	    model.hasMany(TaskModel, { as: 'tasks', foreignKey: 'project_id', sourceKey: 'id' });

	    return model;
    }
}

module.exports = ProjectModel;
