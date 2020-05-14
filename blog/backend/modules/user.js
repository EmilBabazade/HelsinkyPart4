const mongoose = require('mongoose')
const uniqueVlaidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		minlength: 3,
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
		},
	],
})

userSchema.plugin(uniqueVlaidator)

userSchema.set('toJSON', {
	transform: ((document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
		delete returnedObj.passwordHash // u aint lookin at my passwords
	}),
})
/* eslint-disable new-cap */
module.exports = new mongoose.model('User', userSchema)
