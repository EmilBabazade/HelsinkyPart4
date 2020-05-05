const express = require('express')
//   const logger = require('../utils/logger')
const Blog = require('../modules/blog')
require('express-async-errors')

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	return res.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)
	if (blog.likes === undefined) {
		blog.likes = 0
	}
	const result = await blog.save()
	res.status(201).json(result.toJSON())
})

module.exports = blogRouter
