const express = require('express')
const cp = require('cookie-parser')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'config/config.env' })
}

app.use(cors(corsOptions))

// using middlewares
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true })) // learn about this, we can also use body parser package
app.use(cp())

// importing routes
const post = require('./routes/post')
const user = require('./routes/user')

// using routes
app.use('/api/v1', post)
app.use('/api/v1', user)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "/frontend/build/index.html")))
}

module.exports = app