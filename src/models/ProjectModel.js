const Sequelize = require('sequelize');

class ProjectModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {

        return super.init(
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
                    find: {
                        attributes: ['userId', 'name', 'createdAt', 'deletedAt'],
                    },
                },
            }
        );
    }
}

module.exports = ProjectModel;
