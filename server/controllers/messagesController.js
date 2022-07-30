const db = require('../db/dbConnection')

class messagesController {

    async getMessage(req, res) {
        const senderID = req.id
        const recipientID = req.params.id
        db.query('SELECT * FROM messages WHERE senderID = ? AND recipientID = ? or senderID = ? AND recipientID = ?', [
            senderID, recipientID, recipientID, senderID
        ])
        .then(data => {
            const msg = data[0]
            res.json(msg)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = new messagesController