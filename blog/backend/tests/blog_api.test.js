const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../modules/blog')
const helper = require('./test_helper.js')

const api = supertest(app)

beforeEach(async () => {
	// initialize db with initial blogs from helper file
	await Blog.deleteMany({})
	console.log('done')
	const blogObjs = helper.initialBlogs.map((b) => new Blog(b))
	const promiseArr = blogObjs.map((b) => b.save())
	await Promise.all(promiseArr)
})

test('a blog has id property but no _id and no _v', async () => {
	// if you try helper.blogsInDB()[0] first expect line will get undefined
	// no clue why but, yeah, don't break that
	const blogs = await helper.blogsInDB()
	const blog = blogs[0]
	expect(blog.id).toBeDefined()
	expect(blog._id).not.toBeDefined()
	expect(blog._v).not.toBeDefined()
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs/')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('GET .../api/blogs returns correct number of blogs', async () => {
	const blogs = await api
		.get('/api/blogs/')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	expect(blogs.body).toHaveLength(helper.initialBlogs.length)
})


afterAll(() => {
	mongoose.connection.close()
})
