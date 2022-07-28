const jwt = require('jsonwebtoken')
const secret_key = require('../settings')

module.exports = function(req, res, next) {
    const token = req.headers.authtorization.split(' ')[1]
    if(!token) return res.json({message: 'USER IS NOT LOGIN'})
    const {id} = jwt.decode(token, secret_key)
    req.id = id
    next()
}