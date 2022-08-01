const db = require('../db/dbConnection')

class chatController {
    async profileInfo(req, res) {
        const userID = req.id
        db.query('SELECT email, name FROM users WHERE userID = ?', [userID])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            console.log(err)
            res.json({message: 'USER NOT FOUND'})
        }) 
    }

    async getUsers(req, res) {
        const userID = req.params.id
        db.query("SELECT email, name, userID FROM users WHERE userID != ?", [userID])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getUserById(req, res) {
        const userID = req.params.id
        db.query("SELECT email, name, userID FROM users WHERE userID = ?", [userID])
        .then(data => {
            res.json(data[0][0])
        })
        .catch(err => {
            console.log(err)
            res.json({message: "USER NOT FOUND"})
        })
    }

    async getMyChats(req, res) {
        const myID = req.id
        db.query("SELECT * FROM userchats WHERE senderID = ? or recipientID = ?", [myID, myID])
        .then(data => {
            const usersID = data[0].map(c => {
                return Object.values(c)
                .slice(1)
                .filter(c => c !== myID)[0]
            })
            .filter(value => value)
            res.json(usersID)
        })
        .catch(err => {
            console.log(err)
        })
    }

    async searchUsersByEmail(req, res) {
        const email = req.params.email
        db.query(`SELECT email, name, userID FROM users WHERE email like '%${email}%'`)
        .then(data => {
            res.json(data[0])
        })
        .catch(err => console.log(err))
    }
}

module.exports = new chatController