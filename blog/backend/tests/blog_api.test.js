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

test('GET .../api/blogs/ returns correct number of blogs', async () => {
	const blogs = await api
		.get('/api/blogs/')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	expect(blogs.body).toHaveLength(helper.initialBlogs.length)
})

test('POST .../api/blogs/ succesfully creates a blogpost', async () => {
	const blog = new Blog({
		title: 'I like dogs',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 99,
	})

	await api
		.post('/api/blogs/')
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	const titles = blogsAtEnd.map((b) => b.title)
	expect(titles).toContain('I like dogs')
})

test('if the likes property of blog is missing from create request, it will default to the value 0', async () => {
	const blog = new Blog({
		_id: '5a422aa71b54a676234d17f8',
		title: 'I like dogs',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	})

	await api
		.post('/api/blogs/')
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogs = await helper.blogsInDB()
	const createdBlogLikes = blogs[blogs.length - 1].likes
	expect(createdBlogLikes).toBe(0)
})

afterAll(() => {
	mongoose.connection.close()
})
