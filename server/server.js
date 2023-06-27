const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser({
    secret: process.env.COOKIE_SECRET
}))

const apiRouter = require('./api/api')
app.use('/api', apiRouter)  

app.listen({
    port: process.env.PORT || 3001
}, () => {
    console.log(`Your server is running on port ${process.env.PORT}`)
})

module.exports = app
