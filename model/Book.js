const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author:{
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type:String,
        required: true
    },
    category: {
        type:String,
        enum:['Fiction','nonFiction','Drama','Poetry','Folktale'],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

const Book = mongoose.model('Book',  bookSchema);
module.exports = Book;