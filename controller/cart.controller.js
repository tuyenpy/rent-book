const User = require('../model/user.model');
const Book = require('../model/book.model');

module.exports.index = async (req, res) => {
    //Check query
    let q = req.query.q;
    //Retrieve user information
    let user = res.locals.user;
    //Retrieve book information
    let books = await Promise.all(user.cart.map(async id => {
        return await Book.findById(id)
    }))
     //Add property amount to the book object

    //If the query equals reset, all books in the basket will be deleted
    if (q === 'reset') {
        await User.findOneAndUpdate({
            _id: user._id
        }, {
            cart: []
        }, {
            new: true
        })
        res.redirect('/cart');
        return;
    }

    res.render('./cart/index', {
        books
    });
}