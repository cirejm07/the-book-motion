const bookRouter = require('express').Router()
const bookController = require('../controllers/booksController')

bookRouter.get('/getBook', bookController.admin_viewBook)
bookRouter.get('/getBook/:id', bookController.getById_adminBook)
bookRouter.get('/addBook', bookController.add_adminBook)
module.exports = bookRouter;