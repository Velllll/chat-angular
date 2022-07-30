const Router = require('express')
const router = new Router()
const messagesController = require('../controllers/messagesController')
const userCheckMiddleware = require('../middlewares/userCheckMiddleware')

router.get('/messages/:id', userCheckMiddleware, messagesController.getMessage)

module.exports = router