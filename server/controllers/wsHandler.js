class ws{
    constructor(aWss) {
        this.aWss = aWss
    }
    
    ws = (ws) => {
        ws.on('message', message => {
            const msg = JSON.parse(message)
            switch (msg.method) {
                case 'connection':
                    ws.send(JSON.stringify(msg))
                    ws.id = msg.senderID
                    console.log(msg)
                    break;
                case 'message':
                    this.broadcastConnection(ws, msg)
                    break;
            }
        })
    }


    broadcastConnection = (ws, msg) => {
        this.aWss.clients.forEach(client => {  
            if(client.id === msg.recipientID) client.send(JSON.stringify(msg))
            if(client.id === msg.senderID) client.send(JSON.stringify(msg))
        })
    }
}

module.exports = ws