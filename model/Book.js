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
        type:Array,
        default: [],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

bookSchema.index({title: 'text', description: 'text', category:'text', author:'text'})

const Book = mongoose.model('Book',  bookSchema);
module.exports = Book;