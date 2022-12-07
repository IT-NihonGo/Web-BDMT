const express = require('express')
const cors = require('cors')

const routes = require('./routers/index')

const app = express()

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://localhost:3001'],
    }),
)

app.use(express.json())

app.use('/public', express.static('public'))

app.use('/api/auth', routes.auth)
app.use('/api/posts', routes.post)
app.use('/api/users', routes.user)
app.use('/api/stores', routes.store)
app.use('/api/comments', routes.comment)
app.use('/api/likes', routes.like)
app.use('/api/rates', routes.rate)

app.use('/api/upload', routes.upload)


module.exports = app
