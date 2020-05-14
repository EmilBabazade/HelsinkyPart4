require('express-async-errors')
const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../modules/user')

const userRouter = express.Router()

// create a new user
userRouter.post('/', async (req, res) => {
	const { body } = req

	if (body.password.length < 3) {
		const err = new Error()
		err.name = 'invalid password'
		err.message = 'password must be at least 3 characters long'
		throw err
	}
	const passwordHash = await bcrypt.hash(body.password, 10)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()

	res.status(201).json(savedUser.toJSON())
})

// get all the users
userRouter.get('/', async (req, res) => {
	const users = await User.find({})
		.populate('blogs', { title: 1, author: 1 })

	res.json(users.map((user) => user.toJSON()))
})

module.exports = userRouter
