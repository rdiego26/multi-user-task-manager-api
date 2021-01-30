const Sequelize = require('sequelize');

class TaskModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {

        return super.init(
            {
                id: {
                    type: Sequelize.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4,
                },
                projectId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'project_id',
                    references: {
                        model: 'project',
                        key: 'id',
                    },
                },
	              description: {
                    type: DataTypes.STRING(200), allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE, field: 'created_at',
                },
	              finishedAt: {
                  type: DataTypes.DATE, field: 'finished_at',
                },
            },
            {
                sequelize,
                freezeTableName: true,
                createdAt: false,
                updatedAt: false,
                tableName: 'task',
                scopes: {
                    create: {
                        attributes: ['projectId', 'description'],
                    },
                    update: {
                      attributes: ['description', 'finishedAt'],
                    },
                    find: {
                        attributes: ['projectId', 'description', 'createdAt', 'finishedAt'],
                    },
                },
            }
        );
    }
}

module.exports = TaskModel;
