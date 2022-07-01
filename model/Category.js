const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps: true})

categorySchema.index({name: 'text'})

const Category = mongoose.model('Category',  categorySchema);
module.exports = Category;