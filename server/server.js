const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const apiRouter = require('./api/api');
app.use('/api', apiRouter);

app.listen({
    port: process.env.PORT
}, () => {
    console.log(`Your server is running on port ${process.env.PORT}`)
})

module.exports = app;
