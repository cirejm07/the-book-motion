const Category = require('../model/Category')


module.exports.get_category = (req,res) => {
    Category.find().sort({isActive: -1})
    .then((result) => {
        res.status(200).render('category', {categories:result})
    })
    .catch((err) => res.status(500).json(err))
}

module.exports.add_category = (req,res) => {
    const category = new Category (
        req.body
    )
    category.save()
    .then((result) => {
         res.status(200).json(result)
    })
    .catch(err => res.status(500).json(err))
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

module.exports.active_category = async (req ,res) => {
    let id = req.params.id;
    let categoryUpdate = await Category.findByIdAndUpdate(id, {
        isActive: true
    })
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
   
}

module.exports.inactive_category = async (req ,res) => {
    let id = req.params.id;
    let categoryUpdate = await Category.findByIdAndUpdate(id, {
        isActive: false
    })
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
   
}

module.exports.update_category = async (req,res) => {
    let id = req.params.id;

    let categoryUpdate = await Category.findByIdAndUpdate(id, {
        name: req.body.name,
        isAdmin: req.body.admin
    })

    if(categoryUpdate) {
        res.redirect('/category')
    }
}