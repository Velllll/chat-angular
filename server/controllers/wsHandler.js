const db = require('../db/dbConnection')
const fs = require('fs')

class ws{
    constructor(aWss) {
        this.aWss = aWss
    }
    
    ws = (ws) => {
        ws.on('message', message => {
            if(typeof message === 'object') {
                const data = {
                    date: Date.now(),
                    method: 'message-img',
                    photoPath: 'assets/photos/messages/' + Date.now() + '.jpg',
                }
                fs.writeFile(`../client/src/assets/photos/messages/${data.date}.jpg`, Buffer.from(message), err => {})
                ws.send(JSON.stringify(data))
            }
            if(typeof message === 'string') {
                const msg = JSON.parse(message)
                switch (msg.method) {
                    case 'connection':
                        ws.send(JSON.stringify(msg))
                        ws.id = msg.senderID
                        break;
                    case 'message-img-save':
                        db.query('INSERT INTO messages(message, senderID, recipientID, date) values(?, ?, ?, ?)', [
                            msg.photoPath, msg.senderID, msg.recipientID, msg.date
                        ])
                        .catch(err => {
                            console.log('message photo error')
                        })
                        this.broadcastConnection(ws, msg)
                        break;
                    case 'message':
                        this.broadcastConnection(ws, msg)
                        db.query('INSERT INTO messages(message, senderID, recipientID, date) values(?, ?, ?, ?)', [
                            msg.message, msg.senderID, msg.recipientID, msg.date
                        ])
                        .catch(err => {
                            console.log('message error')
                        })
                        break;
                    case 'create-chat':
                        db.query('INSERT INTO userchats(senderID, recipientID) values(?, ?)', [msg.senderID, msg.recipientID])
                        .catch(err => {
                            console.log('create chat error')
                        })
                        break;
                    
                } 
            }
        })
    } 



    broadcastConnection = (ws, msg) => {
        this.aWss.clients.forEach(client => {  
            console.log(msg)
            if(client.id === msg.senderID, client.id === msg.recipientID) return client.send(JSON.stringify(msg))
            if(client.id === msg.recipientID) return client.send(JSON.stringify(msg))
            if(client.id === msg.senderID) return client.send(JSON.stringify(msg)) 
        })
    }
}

module.exports = ws



