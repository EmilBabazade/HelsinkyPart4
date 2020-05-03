const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		// eslint-disable-next-line no-underscore-dangle
		/* eslint-disable-next-line no-param-reassign */
		/* eslint-disable no-underscore-dangle */
		/* eslint-disable no-param-reassign */
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Blog', blogSchema)
