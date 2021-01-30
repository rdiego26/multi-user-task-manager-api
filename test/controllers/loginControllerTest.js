const request = require('supertest');
const { StatusCodes } = require('http-status-codes');
const assert = require('chai').assert;
const app = require('../../src/index');
const faker = require('faker');

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

});