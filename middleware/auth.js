const jwt = require('jsonwebtoken')
const User = require('../model/user')
const requireAuth = (req, res, next) => {
    // grabbing the token in variable "jwt"
    // userControllers - login - line 80
    const token = req.cookies.jwt;

    // check json web token exists and is verified
    if(token) {
        // verify - method on jwt package
        jwt.verify(token, process.env.TOKEN_SECRETHANDSON5, (err, decodedToken) => {
            if(err) {
                console.log(err);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next()
            }
        })
    } else {
        // if there is no token, redirect to login page
        res.redirect('/login')
    }
}

// check current user
const checkUser = (req,res, next) => {
    const token = req.cookies.jwt;
    if(token) {
          // verify - method on jwt package
          jwt.verify(token, process.env.TOKEN_SECRETHANDSON5, async (err, decodedToken) => {
            if(err) {
                console.log(err);
                res.locals.user = null;
                next();
            } else {
                // get payload { id }
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                // if there is a valid user, inject to views
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
} 

module.exports = { requireAuth , checkUser };