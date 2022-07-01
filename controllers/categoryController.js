const Category = require('../model/Category')
const multer = require('multer');


module.exports.get_category = (req,res) => {
    Category.find().sort({isActive: -1})
    .then((result) => {
        res.status(200).render('category', {categories:result})
    })
    .catch((err) => res.status(500).json(err))
}


module.exports.getById_category = (req, res) => {
    const id = req.params.id;
    Category.findById(id)
    .then((result) => {
        res.status(200).render('categoryById',{categories:result})
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

module.exports.view_addCategory = (req,res) => {
    res.render('addCategoryView')
}
