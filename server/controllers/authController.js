const bcrypt = require('bcrypt')
const db = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const secret_key = require('../settings')

function getJWT(id, email) {
    const payload = {
        id,
        email
    }
    return jwt.sign(payload, secret_key, {expiresIn: '24h'})
}

class authController {

    async registration(req, res) {
        const {email, password, name} = req.body
        const hashPassword = bcrypt.hashSync(password, 7)
        db.query("INSERT INTO users(email, password, name) values(?, ?, ?)", [email, hashPassword, name])
        .then(() => {
            res.json({message: `user: ${email} was registred`})
        })
        .catch(err => {
            console.log(err)
            res.json({message: "Duplicate"})
        }) 
    }   

    async login(req, res) {
        const {email, password} = req.body
        db.query("SELECT * FROM users WHERE email = ?", [email])
        .then(user => {
            const userInfo = user[0][0]
            const haveAccess = bcrypt.compareSync(password, userInfo.password)
            if(!haveAccess) {
                return res.json({message: "USER DOSE NOT HAVE ACCESS"})
            }
            res.json({token: getJWT(userInfo.userID, userInfo.email)})
        })
        .catch(err => {
            res.json({message: "USER DOSE NOT EXIST5"})
        })
    }

    async isLogin(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        try {
            if(!token) return res.json({message: 'USER IS NOT LOGIN'})
            const payload = jwt.verify(token, secret_key)
            res.json(payload)
        } catch (error) {
            res.json({message: 'USER IS NOT LOGIN'})
        }
        
    }

}

module.exports = new authController