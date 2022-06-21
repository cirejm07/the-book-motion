const router = require('express').Router();
const usersController = require('../controllers/usersControllers')
router.get('/', usersController.home_get)
router.get('/signup', usersController.signup_get)
router.post('/signup', usersController.signup_post)
router.get('/login', usersController.login_get)
router.post('/login', usersController.login_post)
router.get('/logout', usersController.logout_get)
router.get('/about', usersController.about_get)


module.exports = router;