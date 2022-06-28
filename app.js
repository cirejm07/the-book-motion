// import
const Category = require('./model/Category')
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer')
const { requireAuth, checkUser, verifyAdmin } = require('./middleware/auth')
const app = express();
const usersRoutes = require('./router/usersRoutes')
const categoryRoutes = require('./router/categoryRoutes')
dotEnv.config();

// view engine
app.set('view engine', 'ejs')


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/media', express.static(__dirname + 'public/media'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/js', express.static(__dirname + 'public/assets'));
app.use(express.static('uploads'));

// image upload
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname +"_"+ Date.now() +"_"+ file.originalname)
    }
})

var upload = multer({
    storage: storage,
}).single('image');


// routes
// apply to every single get request
app.get('*', checkUser)

app.get('/admin', verifyAdmin, (req,res,next) =>{
    next()
});
app.get('/users', verifyAdmin, (req,res,next) =>{
    next()
});
app.get('/category', verifyAdmin, (req,res,next) =>{
    next()  
});
app.get('/addCategory', verifyAdmin, (req,res,next) =>{
    next()  
});
app.get('/books', requireAuth,(req, res,next) => {
    next()
})

app.post('/addCategory', upload, (req,res,next) => {
    const category = new Category ({
        name: req.body.name,
        image: req.file.filename
    })
    category.save()
    res.redirect('/category')
})

app.post('/category/:id', upload, async (req,res,next) => {
    if(req.file){
    var data = {
        ...req.body,
        image: req.file.filename
    }
    } else{
        var data = {
            ...req.body,
        }
    }
    let id = req.params.id;
    console.log(req.file)
    let categoryUpdate = await Category.findByIdAndUpdate(id, data)
    
    if(categoryUpdate) {
        res.redirect('/category')
    }
})

// admin
// app.get('/home', requireAuth, verifyAdmin, (req,res,next) => res.render('home'));
app.use(usersRoutes)
app.use(categoryRoutes)



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