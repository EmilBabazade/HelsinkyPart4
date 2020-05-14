const Blog = require('../modules/blog')
const User = require('../modules/user')

const initialUsers = [
	{
		name: 'root',
		username: 'admin',
		password: 'admin',
	},
	{
		name: 'emil',
		username: 'emil1543',
		password: 'emil8989',
	},
]

// initial blogs
const initialBlogs = [
	{
		id: '5a422aa71b54a676234d17c8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra Jolly',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		id: '5a422aa71b54a676234d17b8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 42,
	}, {
		id: '5a422aa71b54a676234d17a8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra Tom',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 10,
	}, {
		id: '5a422aa71b54a676234d17a8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 4,
	},
]
// get all blogs from db
const blogsInDB = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}

// get id of a deleted blog
const nonExsistingId = async () => {
	const blog = new Blog({ likes: 7 })
	await blog.save()
	await blog.remove()
	return blog._id.toString()
}

// get all users from db
const usersInDb = async () => {
	const users = await User.find({})
	return users.map((user) => user.toJSON())
}

module.exports = {
	initialBlogs,
	blogsInDB,
	nonExsistingId,
	initialUsers,
	usersInDb,
}
