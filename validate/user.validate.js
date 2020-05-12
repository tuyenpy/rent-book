const User = require('../model/user.model');
const { comparePassword } = require('../config/bcrypt');

//validate create user
module.exports.create = (req, res, next) => {
    let errors = [];
    // name contains only characters a-zA-Z and max 10 char
    let nameValidate = /^([a-zA-Z]){3,10}$/ig;
    // phone contains onpy digit 10 char
    let phoneValidate = /^(\d){10,11}$/ig

    let { name, phone, email, password } = req.body;

    // validate data in form
    if (!name || !phone || !email || !password) {
        errors.push("Please fill out all fields");
    }
    //validate name, phone, password
    if (nameValidate.test(name) === false) {
        errors.push("Name contains only characters a-zA-Z and min 3 char, max 10 char");
    }

    if (phoneValidate.test(phone) === false) {
        errors.push("Phone contains onpy digit and min 10 max 11 digit");
    }

    //display errors for user
    if (errors.length > 0) {
        res.render('./user/create', { errors });
    } else {
        next();
    }
}
// validate login
module.exports.login = async (req, res, next) => {
    let errors = [];
    let { email, password } = req.body;
    let user;
    
    //email does not exist
    if (!email || !password) {
        errors.push("Please fill out all fields!");
        res.render('./user/login', { errors });
        return;
    }
    //Retrive user information
    user = await User.findOne({ email: email });
    //email exist => user does not exist
    if (!user) {
        errors.push("Email or Password wrong!");
        res.render('./user/login', { errors });
        return;
    }
    //user exist => Password wrong
    if (!comparePassword(password, user.password)) {
        errors.push("Password wrong!")
        res.render('./user/login', { errors });
    } else {
        res.cookie('userID', user._id, { signed: true });
        next();
    }
}

//validate user authencation
module.exports.auth = async (req, res, next) => {
    let userID = req.signedCookies.userID;
    let user;

    //userID does not exist
    if (!userID) {
        res.redirect('/user/login');
    }
    //userID exist
    user = await User.findOne({ _id: userID });
    //user does not exist
    if (!user) {
        res.redirect('/user/login');
    } else {
        next();
    }
}

//Validate admin authencation
module.exports.adminAuth = async (req, res, next) => {
    let userID = req.signedCookies.userID;
    let user;

    //userID does not exist
    if (!userID) {
        res.redirect('/user/login');
    }
    //userID exist
    user = await User.findOne({ _id: userID });
    //user does not exist
    if (user && !user.isAdmin) {
        res.redirect('/transaction');
    } else {
        next();
    }
}