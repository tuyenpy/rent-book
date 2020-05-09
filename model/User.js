const {Schema, model} = require('mongoose');
const userSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    avatar: String
})

const User = model('User', userSchema);

module.exports = User;