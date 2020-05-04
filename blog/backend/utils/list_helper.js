// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((mostLiked, blog) => (
	mostLiked.likes > blog.likes
		? mostLiked
		: blog
), { likes: 0 })

const mostBLogs = (blogs) => {
// map blogs to this [{author: '', blogs: 0}]
	let authorsAndBlogCounts = blogs.map((blog) => {
		// *****each iteration*****
		// filter the array to keep only the current author name
		// and take the length of the filtered new array as the blogs: for the current author
		const blogCount = blogs.filter((blog_) => blog_.author === blog.author).length
		return {
			author: blog.author,
			blogs: blogCount,
		}
	})
	// delete duplicates
	authorsAndBlogCounts = authorsAndBlogCounts
		.filter((item, index, self) => index === self.indexOf(item))
	// at the end just return the author with most blogs
	return authorsAndBlogCounts.reduce((max, current) => (max.blogs >= current.blogs
		? max
		: current), authorsAndBlogCounts[0])
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBLogs,
}
