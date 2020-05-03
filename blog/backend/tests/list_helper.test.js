const { dummy, totalLikes } = require('../utils/list_helper')

test('dummy returns 1', () => {
	expect(dummy([])).toBe(1)
	expect(dummy([1, 2, 3])).toBe(1)
})

describe('total likes ', () => {
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
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0,
			}, {
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
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

	test('of empty list is zero', () => {
		expect(totalLikes(lists.withNoBlogs)).toBe(0)
	})

	test('when list only has one blog equals the likes of that', () => {
		expect(totalLikes(lists.withOneBLog)).toBe(5)
	})

	test('of a bigger list is calculated correctly', () => {
		expect(totalLikes(lists.withManyBlogs)).toBe(19)
	})
})
