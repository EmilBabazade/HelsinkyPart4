const Blog = require('../modules/blog')

// initial blogs
const initialBlogs = [
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra Jolly',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 42,
	}, {
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra Tom',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 10,
	}, {
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

module.exports = {
	initialBlogs,
	blogsInDB,
	nonExsistingId,
}
