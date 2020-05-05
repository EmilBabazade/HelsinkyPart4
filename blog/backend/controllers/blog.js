const express = require('express')
//   const logger = require('../utils/logger')
const Blog = require('../modules/blog')
require('express-async-errors')

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	return res.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then((result) => {
			response.status(201).json(result.toJSON())
			// http status 201 means Created
		})
})

module.exports = blogRouter
