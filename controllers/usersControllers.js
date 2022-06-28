const User = require('../model/user');
const Category = require('../model/Category');
const Book = require('../model/Book');
const { registrationValidation } = require('../middleware/validation');
const { loginValidation } = require('../middleware/validation');
const { requireAuth, checkUser, verifyAdmin } = require('../middleware/auth')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { join } = require('path');




const maxAge = 3 * 24 * 60 * 60; //3days
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRETMINIPROJECT2, {
        expiresIn: maxAge
    })
}



// index page
module.exports.home_get = (req,res) => {
    res.render('home');
}

// view about page
module.exports.about_get = (req, res) => {
    res.render('about');
}

// view sign up page
module.exports.signup_get = (req,res) => {
    res.render('signup');
}

// sign up
module.exports.signup_post = async (req,res) => {
    const {error} = registrationValidation(req.body)

    if(error) return res.status(400).json(error.details[0].message)
    // if email exits
    const userEmail = await User.findOne({email: req.body.email})
    if(userEmail) return res.status(400).json('Email already exist')
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const hashedRepeatPassword = await bcrypt.hash(req.body.repeat_password, salt)
    const user = new User(
        // req.body
        {
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        repeat_password: hashedRepeatPassword
        }
    )
    try {
        const savedUser = await user.save()
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({savedUser: savedUser._id})
    } catch (err){
        res.status(400).json({error})
    }
}

// view log in page
module.exports.login_get = (req,res) => {
    res.render('login');
}


module.exports.login_post = async (req,res) => {
    
    // validation if working
    const {error, result} = loginValidation(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    // validate email
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json('email not found')
    // validate password
    const userPass = await bcrypt.compare(req.body.password, user.password)
    if(!userPass) return res.status(400).json('password did not match')
    // create token and assign a token for a certain login
    
    try {
        const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    // console.log(user)
    // res.header('token', token).json(token) 
//    res.status(200).json("Successfully Logged In!")
   res.status(200).json({user: user._id})
  
   
    } catch (err){
        res.status(400).json({error})
    }
}

// findUser
module.exports.find_user = (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .then((result) => {
        res.status(200).render('findUser', {users:result})
    })
    .catch(err => res.status(500).json(err))
}



// logout
module.exports.logout_get = (req,res) => {
    // removing the token value
    // age = 1 ms
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

// // view admin page
// module.exports.admin_get = (req,res) => {
//     res.render('admin');
// }

// not authorized
module.exports.notAuthorized_get = (req,res) => {
    res.render('autherror')
}

// view book

module.exports.get_books = (req,res) => {
    res.render('books')
}


module.exports.get_admin = async (req,res) => {
   //Categories
   const activeCategory = await Category.find({isActive: true}).count()
   const inactiveCategory = await Category.find({isActive: false}).count()
   const categoryQty = await Category.find().count()
   
//Books
const activeBook = await Book.find({isActive: true}).count()
const inactiveBook = await Book.find({isActive: false}).count()
const bookQty = await Book.find().count()
   //Users
   const adminQty = await User.find({isAdmin: true}).count()
   const ordinaryUserQty = await User.find({isAdmin: false}).count()
   const getUsersQty = await User.find().count()
   
   User.find()
    .then((result) => {
        res.render('admin',{result, adminQty, ordinaryUserQty, getUsersQty, activeCategory, inactiveCategory, categoryQty, activeBook, inactiveBook, bookQty})
    })
    .catch(err => res.json(err))
}

module.exports.get_users = (req,res) => {

    const getUser = User.find().sort({isAdmin: -1})
    .then((result) => {
        res.render('users', {users:result})
    })
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

module.exports.add_books = (req,res) => {
    const books = new Book (
        req.body
    )
    books.save()
    .then((result) => {
         res.status(200).json(result)
    })
    .catch(err => res.status(500).json(err))
}

