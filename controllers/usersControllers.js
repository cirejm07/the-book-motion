const User = require('../model/user');
const { registrationValidation } = require('../middleware/validation');
const { loginValidation } = require('../middleware/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { join } = require('path');




const maxAge = 3 * 24 * 60 * 60; //3days
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRETHANDSON5, {
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

// view log in page
module.exports.login_get = (req,res) => {
    res.render('login');
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
module.exports.login_post = async (req,res) => {
    
    // validation if working
    const {error, result} = loginValidation(req.body)
    if(error) return res.status(400).json(error.details)
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

module.exports.logout_get = (req,res) => {
    // removing the token value
    // age = 1 ms
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}