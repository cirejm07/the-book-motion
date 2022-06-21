const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 500,
        min: 3
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 300
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 3
    },
    repeat_password:{
        type: String,
        required: true,
        max: 1024,
        min: 3
    }
}, {timestamps: true});

// static method
// userSchema.statics.login = async function(email, password) {
//     const user = await this.findOne(email);
//     if (user) {
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//         return user;
//     }
//     throw Error ('Incorrect Password');
// }
//     throw Error('Incorrect Email');
// }


const User = mongoose.model('user', userSchema);
module.exports = User;