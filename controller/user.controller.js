const User = require('../model/user.model');
const { hash, comparePassword } = require('../config/bcrypt');
const uploadCloudinary = require('../config/uploadCloudinary');

//create user
module.exports.create = (req, res) => {
    res.render('user/create');
}

module.exports.postCreate = async (req, res) => {
    let { name, phone, email } = req.body;

    //hash password by bcryptjs
    let password = hash(req.body.password);

    // upload to server-side
    // let avatar = req.file.path.split('\\').slice(1).join('\\');

    //upload to cloudinary through server-side
    let avatar = req.file && await uploadCloudinary(req.file.path);

    //create user
    let user = new User({ name, phone, email, password, avatar });

    user.save()
        .then()
        .catch(({ message }) => console.log(message));

    res.redirect('/');
}

//login
module.exports.login = (req, res) => {
    res.render('./user/login');
}

module.exports.postLogin = (req, res) => {
    res.redirect('/user/profile');
}

//profile
module.exports.profile = (req, res) => {
    let user = res.locals.user;
    res.render('./user/profile', {user});
}

//update profile
module.exports.edit = (req, res) => {
    res.render('./user/edit');
}

module.exports.update = async (req, res) => {
    let user = res.locals.user;
    let {name, phone, email, password} = req.body;
    let newUser = {};
    //If you change your avatar, upload it to cloudinary
    let avatar = req.file && await uploadCloudinary(req.file.path);
    //create info to update
    if (name) {newUser.name = name};
    if (phone) {newUser.phone = phone};
    if (email) {newUser.email = email};
    if (password) {newUser.password = password};
    if (avatar) {newUser.avatar = avatar};
    //Search users and updates
    User.findOneAndUpdate({
        _id: user._id
    }, {
        ...newUser
    }, {
        new: true
    })
      .then()
      .catch(err => console.log(err));
    res.render('./user/profile');
}