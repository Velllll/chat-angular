const db = require('../db/dbConnection')

class ws{
    constructor(aWss) {
        this.aWss = aWss
    }
    
    ws = (ws) => {
        ws.on('message', message => {
            const msg = JSON.parse(message)
            console.log(msg)
            switch (msg.method) {
                case 'connection':
                    ws.send(JSON.stringify(msg))
                    ws.id = msg.senderID
                    console.log(msg)
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
        })
    } 



    broadcastConnection = (ws, msg) => {
        this.aWss.clients.forEach(client => {  
            if(client.id === msg.senderID, client.id === msg.recipientID) return client.send(JSON.stringify(msg))
            if(client.id === msg.recipientID) return client.send(JSON.stringify(msg))
            if(client.id === msg.senderID) return client.send(JSON.stringify(msg)) 
        })
    }
}

module.exports = ws