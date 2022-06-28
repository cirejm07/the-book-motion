const router = require('express').Router();
const usersController = require('../controllers/usersControllers')

// regular user
router.get('/', usersController.home_get)
router.get('/signup', usersController.signup_get)
router.post('/signup',usersController.signup_post)
router.get('/login', usersController.login_get)
router.post('/login', usersController.login_post)
router.get('/logout', usersController.logout_get)
router.get('/about', usersController.about_get)
router.get('/books', usersController.get_books)
router.get('/authFail', usersController.notAuthorized_get)
router.get('/user/:id',  usersController.find_user)
// router.get('/admin', usersController.get_user)
// admin
router.get('/admin', usersController.get_admin)
router.get('/users', usersController.get_users)
router.post('/addCategory', usersController.add_category)
router.post('/addBook', usersController.add_books)

module.exports = router;