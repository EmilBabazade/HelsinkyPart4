const { dummy } = require('../utils/list_helper')

test('dummy returns 1', () => {
	expect(dummy([])).toBe(1)
	expect(dummy([1, 2, 3])).toBe(1)
})
