const express = require('express')
const app = require('../server')

const apiRouter = express.Router()
module.exports = apiRouter

const onRequestHook = require('./user')
apiRouter.use(onRequestHook) // fake user login before each request

const postsRouter = require('./posts')
apiRouter.use('/posts', postsRouter)

const commentsRouter = require('./comments');
postsRouter.use('/:postId/comments', commentsRouter);