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
        db.query("SELECT email, name FROM users WHERE userID = ?", [userID])
        .then(data => {
            res.json(data[0][0])
        })
        .catch(err => {
            console.log(err)
            res.json({message: "USER NOT FOUND"})
        })
    }
}

module.exports = new chatController