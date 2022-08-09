const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const userCheckMiddleware = require('../middlewares/userCheckMiddleware')

router.get('/profileinfo', userCheckMiddleware, userController.profileInfo)
router.get('/users/:id', userController.getUsers)
router.get('/user/:id', userController.getUserById)
router.get('/usersbyemail/:email', userController.searchUsersByEmail)
router.get('/mychats', userCheckMiddleware, userController.getMyChats)
router.post('/setmyphotos', userCheckMiddleware, userController.setPhoto)
router.get('/photos/:userid', userController.getProfilePhotos)

module.exports = router