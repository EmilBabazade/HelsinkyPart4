const express = require('express')
//   const logger = require('../utils/logger')
const Blog = require('../modules/blog')

const blogRouter = express.Router()

blogRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then((blogs) => {
			response.json(blogs)
		})
})

blogRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then((result) => {
			response.status(201).json(result)
			// http status 201 means Created
		})
})

module.exports = blogRouter
