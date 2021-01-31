const dayJs = require('dayjs');
const uuid = require('uuid-v4');
const Sequelize = require('sequelize');
const connection = require('../utils/poolConnection');
const UserModel = require('../models/UserModel').init(connection, Sequelize.DataTypes);
const ProjectModel = require('../models/ProjectModel').init(connection, Sequelize.DataTypes);
const TaskModel = require('../models/TaskModel').init(connection, Sequelize.DataTypes);
const { Op } = Sequelize;

class SessionService {
	constructor(sessionModel) {
		this.sessionModel = sessionModel;
	}

	async fetchUserData(token) {
		const query = { token };

		return this.sessionModel
			.scope('find')
			.findOne({
				where: query,
				include: [{
					model: UserModel.scope('relation'),
					as: 'user',
					include: [
						{
							model: ProjectModel.scope('relation'),
							as: 'projects',
							order: [['name', 'ASC']],
							include: [
								{
									model: TaskModel,
									as: 'tasks',
									order: [['description', 'ASC']],
								}
							]
						}
					],
				}],
			});

	}

	async create(userId) {
		const item = {
			token: uuid(),
			userId,
			expiresAt: dayJs().add(10, 'days'),
		};

		return this.sessionModel
			.scope('create')
			.create(item);
	}

	async findActiveToken(token) {
		const query = {
			token,
			expiresAt: {
				[Op.gt]: connection.fn('NOW'),
			},
		};

		return this.sessionModel
			.scope('find')
			.findOne({
				where: query,
                include: [{
                    model: UserModel,
                    as: 'user',
                }],
			});
	}

    async increment(session) {
      const query = {
          token: session.token
      };

      const newData = {
          expiresAt: dayJs(session.expiresAt).add(1, 'days')
			};

      return this.sessionModel.update(newData, {
          where: query,
          returning: true,
          plain: true,
      });
    }

	async deleteByToken(token) {
		const query = { token };
		return this.sessionModel.destroy({ where: query });
	}

}

module.exports = SessionService;