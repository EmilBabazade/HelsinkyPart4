// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((mostLiked, blog) => (
	mostLiked.likes > blog.likes
		? mostLiked
		: blog
), { likes: 0 })

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
}
