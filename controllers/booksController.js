const Books = require('../model/Book')

module.exports.admin_viewBook = (req,res) => {
    Books.find().sort({isActive: -1})
    .then((result) => {
        res.status(200).render('adminBooks', {books:result})
    })
    .catch((err) => res.status(500).json(err))
}

module.exports.getById_adminBook = (req, res) => {
    const id = req.params.id;
    Books.findById(id)
    .then((result) => {
        res.status(200).render('adminBookById',{books:result})
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

module.exports.add_adminBook = (req,res) => {
    res.render('adminAddBookView')
}

module.exports.view_allBooks = async (req,res) => {

    let count = await Books.find().countDocuments();
    let random = Math.floor(Math.random() * count)
    let book = await Books.findOne().skip(random).exec()

     let getAllBooks = await Books.find({isActive: true}).sort({createdAt: -1})
    
    res.render('allBooks', {books:getAllBooks, book})


   
}
// ordinary
module.exports.getById_ordinaryBook = (req, res) => {
    const id = req.params.id;
    Books.findById(id)
    .then((result) => {
        res.status(200).render('getbook',{books:result})
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}