const categoryRouter = require('express').Router()
const categoryController = require('../controllers/categoryController')

categoryRouter.get('/category', categoryController.get_category)
categoryRouter.get('/category/:id', categoryController.getById_category)
categoryRouter.post('/addCategory', categoryController.add_category)
categoryRouter.post('/activateCategory/:id', categoryController.active_category)
categoryRouter.post('/deactivateCategory/:id', categoryController.inactive_category)
categoryRouter.post('/category/:id', categoryController.update_category)
module.exports = categoryRouter;