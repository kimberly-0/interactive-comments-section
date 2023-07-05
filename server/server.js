const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

dotenv.config()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

const apiRouter = require('./api/api')
app.use('/api', apiRouter)  

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen({
    port: process.env.PORT || 3001
}, () => {
    console.log(`Your server is running on port ${process.env.PORT}`)
})

module.exports = app

// send user ID to front end since cookies do not work for cross-domain deployment (in case of deployment of client and server on a single domain, remove the code below
// const apiRouter = require('./api/api')
// apiRouter.get("/getUserId",  (req, res) => {
//     return res.status(200).json(req.cookies.userId)
// })