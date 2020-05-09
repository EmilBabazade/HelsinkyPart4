require('express-async-errors')
const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../modules/user')

const userRouter = express.Router()

// create a new user
userRouter.post('/', async (req, res) => {
	const { body } = req

	const passwordHash = await bcrypt.hash(body.password, 10)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()

	res.json(savedUser)
})

// get all the users
userRouter.get('/', async (req, res) => {
	const users = await User.find({})
		.populate('blogs', { title: 1, author: 1 })

	res.json(users)
})

module.exports = userRouter
