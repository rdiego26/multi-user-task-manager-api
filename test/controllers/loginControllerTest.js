const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const assert = require('chai').assert;
const app = require('../../src/index');
const faker = require('faker');
const sinon = require("sinon");
const UserService = require('../../src/services').UserService;
const SessionService = require('../../src/services').SessionService;

describe('Login Controller', () => {

	it('should receive bad request when send empty body', async () => {
		await request(app)
				.post('/api/login')
				.send({})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.BAD_REQUEST);
	});

	it('should receive bad request when send only email', async () => {
		let response = await request(app)
			.post('/api/login')
			.send({ email: faker.internet.email() })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(StatusCodes.BAD_REQUEST);

		assert.ok(response.body?.errors.length === 1);
		assert.propertyVal(response.body?.errors[0], 'message', "should have required property 'password'");
	});

	it('should receive bad request when send only password', async () => {
		let response = await request(app)
			.post('/api/login')
			.send({ password: faker.internet.password() })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(StatusCodes.BAD_REQUEST);

		assert.ok(response.body.errors.length === 1);
		assert.propertyVal(response.body?.errors[0], 'message', "should have required property 'email'");
	});

	it('should receive properly response when send valid data', async () => {
		let userStub = sinon.stub(UserService, 'findWithCredentials').returns(null);

		await request(app)
			.post('/api/login')
			.send({ email: faker.internet.email(), password: faker.internet.password() })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(StatusCodes.UNAUTHORIZED);
		await userStub.restore();
	});

	it('should receive properly response when send valid data', async () => {
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
			expiresAt: faker.date.future()
		};

		let userStub = sinon.stub(UserService, 'findWithCredentials').returns(mockedUser);
		let sessionStub = sinon.stub(SessionService, 'create').returns(mockedSession);

		let response = await request(app)
			.post('/api/login')
			.send({ email: mockedUser.email, password: mockedUser.password })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(StatusCodes.OK);

		assert.property(response.body, 'id');
		assert.property(response.body, 'userId');
		assert.property(response.body, 'token');
		assert.property(response.body, 'expiresAt');
		await userStub.restore();
		await sessionStub.restore();
	});

});