const router = require('express').Router();
const usersController = require('../controllers/usersControllers')

// regular user
router.get('/home', usersController.home_get)
router.get('/signup', usersController.signup_get)
router.post('/signup', usersController.signup_post)
router.get('/login', usersController.login_get)
router.post('/login', usersController.login_post)
router.get('/logout', usersController.logout_get)
router.get('/about', usersController.about_get)
router.get('/books', usersController.get_books)
router.get('/authFail', usersController.notAuthorized_get)
// admin
router.get('/admin', usersController.admin_get)

module.exports = router;