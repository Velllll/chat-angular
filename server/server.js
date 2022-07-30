const express = require('express')
const app = new express()
const WSserver = require('express-ws')(app)
const aWss = WSserver.getWss()
require('dotenv').config({path: '.env.local'})
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const messagesRouter = require('./routers/messagesRouter')
const cors = require('cors')
const wsHandler = require('./controllers/wsHandler')
const ws = new wsHandler(aWss)

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.ws('/ws', ws.ws)

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', messagesRouter)

const startServer = () => {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ', PORT))
    } catch (error) {
        console.log(error)
    }
}

startServer()