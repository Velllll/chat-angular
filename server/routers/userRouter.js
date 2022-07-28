const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const userCheckMiddleware = require('../middlewares/userCheckMiddleware')

router.get('/profileinfo', userCheckMiddleware, userController.profileInfo)
router.get('/users/:id', userController.getUsers)
router.get('/user/:id', userController.getUserById)

module.exports = router