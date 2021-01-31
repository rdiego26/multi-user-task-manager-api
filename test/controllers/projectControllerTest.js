const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const assert = require('chai').assert;
const app = require('../../src/index');
const faker = require('faker');
const sinon = require('sinon');
const dayJs = require('dayjs');
const ProjectService = require('../../src/services').ProjectService;
const SessionService = require('../../src/services').SessionService;

describe('Project Controller', () => {

	const PROJECT_PATH = '/api/project';

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

		it('should receive bad request when send only userId', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			let response = await request(app)
				.post(PROJECT_PATH)
				.send({ userId: mockedUser.id })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.BAD_REQUEST);

			const possibleErrors = ["should have required property 'name'"];

			assert.ok(response.body?.errors.length > 0);
			assert.ok(possibleErrors.includes(response.body?.errors[0].message));

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive bad request when send only name', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			let response = await request(app)
				.post(PROJECT_PATH)
				.send({ name: faker.name.findName() })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.BAD_REQUEST);

			const possibleErrors = ["should have required property 'userId'"];

			assert.ok(response.body?.errors.length > 0);
			assert.ok(possibleErrors.includes(response.body?.errors[0].message));

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive properly response when send valid data', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);
			let projectServiceStub = sinon.stub(ProjectService, 'create').returns(mockedProject);

			let result = await request(app)
				.post(PROJECT_PATH)
				.send({ name: mockedProject.name, userId: mockedUser.id })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.OK);

			assert.equal(result.body.id, mockedProject.id);
			assert.equal(result.body.name, mockedProject.name);
			assert.equal(result.body.userId, mockedProject.userId);

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
			await projectServiceStub.restore();
		});

	});

	describe(`PUT ${PROJECT_PATH}`, () => {
		it('should receive unauthorized when try create without any token', async () => {
			await request(app)
				.put(`${PROJECT_PATH}/${mockedProject.id}`)
				.send({})
				.set('Accept', 'application/json')
				.expect(StatusCodes.UNAUTHORIZED);
		});

		it('should receive bad request send empty body', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			await request(app)
				.put(`${PROJECT_PATH}/${mockedProject.id}`)
				.send({})
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect(StatusCodes.BAD_REQUEST);

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive bad request when send only deletedAt', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);

			let response = await request(app)
				.put(`${PROJECT_PATH}/${mockedProject.id}`)
				.send({ deletedAt: faker.date.future() })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.BAD_REQUEST);

			const possibleErrors = ["should have required property 'name'"];

			assert.ok(response.body?.errors.length > 0);
			assert.ok(possibleErrors.includes(response.body?.errors[0].message));

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
		});

		it('should receive properly response when send valid data', async () => {
			let sessionFindActiveTokenStub = sinon.stub(SessionService, 'findActiveToken').returns(mockedSession);
			let sessionIncrementStub = sinon.stub(SessionService, 'increment').returns(mockedSession);
			let projectServiceStub = sinon.stub(ProjectService, 'update').returns(mockedProject);

			let result = await request(app)
				.put(`${PROJECT_PATH}/${mockedProject.id}`)
				.send({ name: mockedProject.name })
				.set('x-access-token', faker.random.uuid())
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.OK);

			assert.equal(result.body.id, mockedProject.id);
			assert.equal(result.body.name, mockedProject.name);

			await sessionFindActiveTokenStub.restore();
			await sessionIncrementStub.restore();
			await projectServiceStub.restore();
		});

	});

});