const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper.js')
const User = require('../modules/user')

const api = supertest(app)

beforeEach(async () => {
	// initialize db with initial users
	await User.deleteMany({})
	const users = helper.initialUsers.map((user) => new User(user))
	const promiseArr = users.map((user) => user.save())
	await Promise.all(promiseArr)
})

describe('Operations with many users', () => {
	test('user get returns correctly', async () => {
		const returnedUsers = await api
			.get('/api/users/')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(returnedUsers.body).toHaveLength(helper.initialUsers.length)
	})
})

describe('User creation', () => {
	test('user creation works correctly', async () => {
		const user = {
			name: 'ehmed',
			username: 'memmed',
			password: 'bob',
		}

		const result = await api
			.post('/api/users/')
			.send(user)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const newUser = result.body
		// check returned user from creation contaions user.name
		expect(newUser.name).toBe(user.name)

		// check users in db's length is 1 bigger than length of initial users
		const usersInDb = await helper.usersInDb()
		expect(usersInDb).toHaveLength(helper.initialUsers.length + 1)
	})
	test('user creation doesn\'t allow duplicate name', async () => {
		const user = {
			name: 'ehmed',
			username: 'memmed',
			password: 'bob',
		}

		await api
			.post('/api/users/')
			.send(user)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const result = await api
			.post('/api/users/')
			.send(user)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const errMsg = result.body.error
		expect(errMsg).toContain('Error, expected `username` to be unique.')
	})
	test('user creation doesn\'t allow name less than 3 chars', async () => {
		const user = {
			name: 'ehmed',
			username: 'me',
			password: 'bob',
		}

		await api
			.post('/api/users/')
			.send(user)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
	test('user creation doesnt allow password less than 3 chars', async () => {
		const user = {
			name: 'ehmed',
			username: 'memes',
			password: 'bo',
		}

		await api
			.post('/api/users/')
			.send(user)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
