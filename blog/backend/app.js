const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

const app = express()

logger.info(`connecting to database at ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.undefinedEndpoint)
app.use(middleware.errorHandler)

module.exports = app
