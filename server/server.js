// import { PrismaClient } from "@prisma/client"

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

const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient()

async function onRequestHook (req, res, next) {
    const CURRENT_USER_ID = (
        // Change name to log in as a different person: 'juliusomo', 'maxblagun', 'ramsesmiron', or 'amyrobson'
        await prisma.user.findFirst({ where: { name: "juliusomo" } }).then(user => {
            return user.id
        }).catch(error => {
            console.log(error)
        })
    )

    if (req.cookies.userId !== CURRENT_USER_ID) {
        req.cookies.userId = CURRENT_USER_ID
        res.clearCookie("userId")
        res.cookie("userId", CURRENT_USER_ID)
    }
    
    // console.log("req.cookies : " + req.cookies.userId)
    // console.log("req.signedCookies : " + req.signedCookies.userId)

    next()
}

app.use(onRequestHook)

const apiRouter = require('./api/api')
app.use('/api', apiRouter)  

app.listen({
    port: process.env.PORT || 3001
}, () => {
    console.log(`Your server is running on port ${process.env.PORT}`)
})

module.exports = app
