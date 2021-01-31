const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const assert = require('chai').assert;
const app = require('../../src/index');
const faker = require('faker');
const sinon = require('sinon');
const dayJs = require('dayjs');
const TaskService = require('../../src/services').TaskService;
const SessionService = require('../../src/services').SessionService;

describe('Task Controller', () => {

	const PROJECT_PATH = '/api/task';

	const mockedUser = {
		id: faker.random.uuid(),
		name: faker.name.findName(),
		email: faker.internet.email(),
		password: faker.internet.password()
	};

	const mockedSession = {
		id: faker.random.uuid(),
		userId: mockedUser.id,
		token: faker.random.alphaNumeric(10),
		expiresAt: dayJs().add(1, 'minutes').format('YYYY-MM-DDTHH:mm:ss')
	};

	const mockedProject = {
		id: faker.random.uuid(),
		userId: mockedUser.id,
		name: faker.lorem.sentence(),
		createdAt: dayJs().format('YYYY-MM-DDTHH:mm:ss'),
		deletedAt: null,
	};

	const mockedTask = {
		id: faker.random.uuid(),
		projectId: mockedProject.id,
		description: faker.lorem.sentence(),
		createdAt: dayJs().format('YYYY-MM-DDTHH:mm:ss'),
		finishedAt: null,
	};

	describe(`POST ${PROJECT_PATH}`, () => {
		it('should receive unauthorized when try create without any token', async () => {
			await request(app)
				.post(PROJECT_PATH)
				.send({})
				.set('Accept', 'application/json')
				.expect(StatusCodes.UNAUTHORIZED);
		});

		it('should receive bad request send empty body', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			await request(app)
				.post(PROJECT_PATH)
				.send({})
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect(StatusCodes.BAD_REQUEST);

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive bad request when send only projectId', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			let response = await request(app)
				.post(PROJECT_PATH)
				.send({ projectId: mockedProject.id })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.BAD_REQUEST);

			const possibleErrors = ["should have required property 'description'"];

			assert.ok(response.body?.errors.length > 0);
			assert.ok(possibleErrors.includes(response.body?.errors[0].message));

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive bad request when send only description', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			let response = await request(app)
				.post(PROJECT_PATH)
				.send({ description: faker.name.findName() })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.BAD_REQUEST);

			const possibleErrors = ["should have required property 'projectId'"];

			assert.ok(response.body?.errors.length > 0);
			assert.ok(possibleErrors.includes(response.body?.errors[0].message));

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive properly response when send valid data', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);
			let projectServiceStub = sinon.stub(TaskService, 'create').returns(mockedTask);

			let result = await request(app)
				.post(PROJECT_PATH)
				.send({ description: mockedTask.description, projectId: mockedProject.id })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.OK);

			assert.equal(result.body.id, mockedTask.id);
			assert.equal(result.body.description, mockedTask.description);
			assert.equal(result.body.projectId, mockedTask.projectId);

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
			await projectServiceStub.restore();
		});

	});

	describe(`PUT ${PROJECT_PATH}`, () => {
		it('should receive unauthorized when try create without any token', async () => {
			await request(app)
				.put(`${PROJECT_PATH}/${mockedTask.id}`)
				.send({})
				.set('Accept', 'application/json')
				.expect(StatusCodes.UNAUTHORIZED);
		});

		it('should receive bad request send empty body', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			await request(app)
				.put(`${PROJECT_PATH}/${mockedTask.id}`)
				.send({})
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect(StatusCodes.BAD_REQUEST);

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive bad request when send only finishedAt', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			let response = await request(app)
				.put(`${PROJECT_PATH}/${mockedTask.id}`)
				.send({ finishedAt: dayJs().format('YYYY-MM-DDTHH:mm:ss') })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.BAD_REQUEST);

			const possibleErrors = ["should have required property 'description'"];

			assert.ok(response.body?.errors.length > 0);
			assert.ok(possibleErrors.includes(response.body?.errors[0].message));

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive properly response when send valid data', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);
			let projectServiceStub = sinon.stub(TaskService, 'update').returns(mockedTask);

			let result = await request(app)
				.put(`${PROJECT_PATH}/${mockedTask.id}`)
				.send({ description: mockedTask.description })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.OK);

			assert.equal(result.body.id, mockedTask.id);
			assert.equal(result.body.description, mockedTask.description);

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
			await projectServiceStub.restore();
		});

	});

});