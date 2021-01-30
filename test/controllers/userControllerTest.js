const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const assert = require('chai').assert;
const app = require('../../src/index');
const faker = require('faker');
const sinon = require("sinon");
const UserService = require('../../src/services').UserService;

describe('User Controller', () => {

	const USER_PATH = '/api/user';

	it('should receive bad request when send empty body', async () => {
		await request(app)
				.post(USER_PATH)
				.send({})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(StatusCodes.BAD_REQUEST);
	});

	it('should receive bad request when send only email', async () => {
		let response = await request(app)
			.post(USER_PATH)
			.send({ email: faker.internet.email() })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(StatusCodes.BAD_REQUEST);

		const possibleErrors = ["should have required property 'name'", "should have required property 'password'"];

		assert.ok(response.body?.errors.length > 0);
		assert.ok(possibleErrors.includes(response.body?.errors[0].message));
	});

	it('should receive bad request when send only password', async () => {
		let response = await request(app)
			.post(USER_PATH)
			.send({ password: faker.internet.password() })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(StatusCodes.BAD_REQUEST);

		const possibleErrors = ["should have required property 'name'", "should have required property 'email'"];

		assert.ok(response.body?.errors.length > 0);
		assert.ok(possibleErrors.includes(response.body?.errors[0].message));
	});

	it('should receive bad request when send only name', async () => {
		let response = await request(app)
			.post(USER_PATH)
			.send({ name: faker.name.findName() })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(StatusCodes.BAD_REQUEST);

		const possibleErrors = ["should have required property 'password'", "should have required property 'email'"];

		assert.ok(response.body?.errors.length > 0);
		assert.ok(possibleErrors.includes(response.body?.errors[0].message));
	});

	it('should receive properly response when send valid data', async () => {
		const mockedUser = {
			id: faker.random.uuid(),
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password()
		};
		let userServiceStub = sinon.stub(UserService, 'create').returns(mockedUser);

		let result = await request(app)
			.post(USER_PATH)
			.send({ email: faker.internet.email(), name: faker.name.findName(), password: faker.internet.password() })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(StatusCodes.OK);

		assert.deepEqual(result.body, mockedUser);

		await userServiceStub.restore();
	});

});