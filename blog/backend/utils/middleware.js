const logger = require('./logger')

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	logger.error(err)

	if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	}
	if (err.name === 'invalid password') {
		return res.status(400).json({ error: err.message })
	}

	next(err)
}

const undefinedEndpoint = (req, res) => {
	logger.error('undefined endpoint')
	res.status(404).json({ error: 'undefined endpoint' })
}

module.exports = {
	errorHandler,
	undefinedEndpoint,
}
