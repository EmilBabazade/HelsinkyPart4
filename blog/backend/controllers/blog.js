const express = require('express')
//   const logger = require('../utils/logger')
const Blog = require('../modules/blog')
require('express-async-errors')

const blogRouter = express.Router()

// get all blogposts
blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	return res.json(blogs.map((blog) => blog.toJSON()))
})

// create a blogpost
blogRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)
	if (blog.likes === undefined) {
		blog.likes = 0
	}
	const result = await blog.save()
	res.status(201).json(result.toJSON())
})

// delete a blogpost
blogRouter.delete('/:id', async (req, res) => {
	const result = await Blog.findByIdAndDelete(req.params.id)
	res.status(204).json(result.toJSON())
})

// updating a blogpost
blogRouter.put('/:id', async (req, res) => {
	const result = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
	res.status(200).json(result.toJSON())
})

module.exports = blogRouter
