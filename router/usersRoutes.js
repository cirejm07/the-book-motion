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
router.post('/user/:id', usersController.update_user)
router.get('/changePassword/:id', usersController.view_changePassword)
router.post('/changePassword/:id', usersController.user_changePassword)
router.post('/search', usersController.searchItem)
// router.get('/admin', usersController.get_user)
// admin
router.get('/admin', usersController.get_admin)
router.get('/users', usersController.get_users)


module.exports = router;