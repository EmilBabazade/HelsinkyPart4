const https = require('http')
const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

const server = https.createServer(app)

server.listen(config.PORT, () => {
	logger.info(`server running on ${config.PORT}`)
})
