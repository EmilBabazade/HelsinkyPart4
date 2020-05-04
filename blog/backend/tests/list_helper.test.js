const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
	expect(listHelper.dummy([])).toBe(1)
	expect(listHelper.dummy([1, 2, 3])).toBe(1)
})

const lists = {
	withOneBLog: [{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	}],
	withManyBlogs: [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra Jolly',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0,
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 42,
			__v: 0,
		}, {
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra Tom',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0,
		}, {
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 4,
			__v: 0,
		},
	],
	with2AuthorsSameNumberOfBlogs: [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra Tom',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0,
		}, {
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 4,
			__v: 0,
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra Tom',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0,
		}, {
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 4,
			__v: 0,
		},
	],
	withNoBlogs: [],
}

describe('total likes ', () => {
	test('of empty list is zero', () => {
		expect(listHelper.totalLikes(lists.withNoBlogs)).toBe(0)
	})

	test('when list only has one blog equals the likes of that', () => {
		expect(listHelper.totalLikes(lists.withOneBLog)).toBe(5)
	})

	test('of a bigger list is calculated correctly', () => {
		expect(listHelper.totalLikes(lists.withManyBlogs)).toBe(61)
	})
})

describe('Most liked ', () => {
	test('of empty list is {likes: 0}', () => {
		expect(listHelper.favoriteBlog(lists.withNoBlogs)).toEqual({ likes: 0 })
	})

	test('of list with many blogs is selected correctly', () => {
		expect(listHelper.favoriteBlog(lists.withManyBlogs)).toEqual({
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 42,
			__v: 0,
		})
	})

	test('of list with one blog is that blog', () => {
		expect(listHelper.favoriteBlog(lists.withOneBLog)).toEqual({
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0,
		})
	})
})

describe('Author with most blogs', () => {
	test(' of empty list is undefined', () => {
		expect(listHelper.mostBLogs(lists.withNoBlogs)).toEqual(undefined)
	})

	test(' of list with many blogs is selected correctly', () => {
		expect(listHelper.mostBLogs(lists.withManyBlogs)).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 2,
		})
	})

	test(' of list with one blog is that author with 1 blog', () => {
		expect(listHelper.mostBLogs(lists.withOneBLog)).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 1,
		})
	})
})
