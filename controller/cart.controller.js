const User = require('../model/user.model');
const Book = require('../model/book.model');

module.exports.index = async (req, res) => {
    let user = res.locals.user;
    let books = await Promise.all(user.cart.map(async id => {
        return await Book.findById(id)
    }));
    res.render('./cart/index', {
        books
    });
}

module.exports.reset = (req, res) => {
    let user = res.locals.user;

    User.findOneAndUpdate({
        _id: user._id
    }, {
        cart: []
    }, {
        new: true
    })
        .then()
        .catch(err => console.log(err));

    res.redirect('/');
}