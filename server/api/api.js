const express = require('express')
const app = require('../server')

const apiRouter = express.Router()
module.exports = apiRouter

const postsRouter = require('./posts')
apiRouter.use('/posts', postsRouter)
