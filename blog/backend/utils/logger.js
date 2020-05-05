const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	}
}

const error = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.error(...params)
	}
}

// having stuff logged to console during tests is annoying
// but sometimes i need to deliberatly log something to console during tests
const errorTest = (...params) => {
	if (process.env.NODE_ENV === 'test') {
		console.error(...params)
	}
}

const infoTest = (...params) => {
	if (process.env.NODE_ENV === 'test') {
		console.log(...params)
	}
}

module.exports = {
	info,
	error,
	errorTest,
	infoTest,
}
