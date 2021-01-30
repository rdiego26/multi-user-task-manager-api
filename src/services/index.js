const DataTypes = require('sequelize').DataTypes;
const connection = require('../utils/poolConnection');

const userModel = require('../models/UserModel').init(connection, DataTypes);
const sessionModel = require('../models/SessionModel').init(connection, DataTypes);
const projectModel = require('../models/ProjectModel').init(connection, DataTypes);
const taskModel = require('../models/TaskModel').init(connection, DataTypes);

const UserService = require('./UserService');
const SessionService = require('../services/SessionService');
const ProjectService = require('../services/ProjectService');
const TaskService = require('../services/TaskService');

const userServiceInstance = new UserService(userModel);
const sessionServiceInstance = new SessionService(sessionModel);
const projectServiceInstance = new ProjectService(projectModel);
const taskServiceInstance = new TaskService(taskModel);

module.exports = {
	UserService: userServiceInstance,
	SessionService: sessionServiceInstance,
	ProjectService: projectServiceInstance,
	TaskService: taskServiceInstance,
};
