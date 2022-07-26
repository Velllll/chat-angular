const express = require('express')
const app = new express()
const WSserver = require('express-ws')(app)
const aWss = WSserver.getWss()
require('dotenv').config({path: '.env.local'})
const authRouter = require('./routers/authRouter')

const PORT = process.env.PORT || 5000

app.use(express.json())

app.ws('/ws', (ws) => {
    ws.on('message', message => {
        const msg = JSON.parse(message)
        console.log(msg)
        switch (msg.method) {
            case 'connection':
                ws.send(JSON.stringify(`USER CONNECTED ${msg.name}`))
                console.log(`USER CONNECTED ${msg.name}`)
                break;
            case 'message':
                ws.send(JSON.stringify(msg))
                break;
        }
    })
})

app.use('/api', authRouter)

const startServer = () => {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ', PORT))
    } catch (error) {
        console.log(error)
    }
}

startServer()