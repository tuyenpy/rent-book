const User = require('../model/user.model');
const Transaction = require('../model/transaction.model');
const Book = require('../model/book.model');
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
    let avatar = req.file && await uploadCloudinary(req.file.path, 'users');

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

//logout
module.exports.logout = (req, res) => {
    res.clearCookie('userID');
    res.redirect('/home');
}

//profile
module.exports.profile = (req, res) => {
    let user = res.locals.user;
    res.render('./user/profile', { user });
}

//update profile
module.exports.edit = (req, res) => {
    res.render('./user/edit');
}

module.exports.update = async (req, res) => {
    let user = res.locals.user;
    let { name, phone, email, password } = req.body;
    let newUser = {};
    //If you change your avatar, upload it to cloudinary
    let avatar = req.file && await uploadCloudinary(req.file.path);
    //create info to update
    if (name) { newUser.name = name };
    if (phone) { newUser.phone = phone };
    if (email) { newUser.email = email };
    if (password) { newUser.password = password };
    if (avatar) { newUser.avatar = avatar };
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

//Transaction manager
module.exports.transaction = async (req, res) => {
    //Retrive query information
    let q = req.query.q;
    //Retrive user information
    let user = res.locals.user;
    if (user) {
        //Retrive isAdmin status
        let { isAdmin } = user;
        //When returning books
        if (isAdmin && q) {
            await Transaction.findOneAndUpdate({
                _id: q
            }, {
                status: true
            }, {
                new: true
            })
        }
        //Retrive transaction from Transaction with user ID
        let transactions = await Transaction.find();
        //Retrive books from transaction.bookID
        let books = await Promise.all(transactions.map(({ bookID }) => {
            return Book.findById(bookID)
        }));
        //Retrive user from transaction.userID
        let users = await Promise.all(transactions.map(({ userID }) => {
            return User.findById(userID)
        }));

        let newTransactions = [];
        for (let i = 0; i < transactions.length; i++) {
            let { image, title, price } = books[i];
            let { status, date, _id } = transactions[i];
            let { name } = users[i];
            newTransactions.push({
                _id,
                image,
                title,
                price,
                status,
                date,
                name
            });
        }
        res.render('./transaction/index', { newTransactions, isAdmin });
    }
}

//Delete the paid Transaction
module.exports.deleteTransaction = (req, res, next) => {
    Transaction.deleteMany({status: true})
     .then()
     .catch(err => console.log(err));
    next();
}

//Delete all Transaction
module.exports.deleteAll = (req, res, next) => {
    Transaction.deleteMany({})
     .then()
     .catch(err => console.log(err));
     next();
}