// import
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, verifyAdmin } = require('./middleware/auth')
const app = express();
const usersRoutes = require('./router/usersRoutes')
dotEnv.config();

// view engine
app.set('view engine', 'ejs')

// middleware
app.use(express.json())
app.use(cookieParser());
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/media', express.static(__dirname + 'public/media'));
app.use('/js', express.static(__dirname + 'public/js'));


// routes
// apply to every single get request
app.get('*', checkUser)

app.get('/admin', verifyAdmin, (req,res,next) => res.render('admin'));
app.get('/books', requireAuth,(req, res) => res.render('books'))

// admin
// app.get('/home', requireAuth, verifyAdmin, (req,res,next) => res.render('home'));
app.use(usersRoutes)



// page not found
app.use('', (req,res,next) => {
    res.status(404).render('error404') 
    next()
})

// mongoose server
const port = process.env.PORT || 3000;
mongoose.connect(process.env.DB_MINIPROJECT2)
.then(result => app.listen(port, () => {
    if(result) {
        console.log(`Connected to Database, Listening on PORT: ${port}`);
    }
}))
.catch(err => console.log(err))
// console.log(process.env);