const User = require('../model/user.model');
const Book = require('../model/book.model');


//book index
module.exports.index = async (req, res) => {
    //The book will add to the cart
    let book;
    //If the user adds to the cart
    let bookID = req.query.addtocart;
    //Retrieve user information
    let user = res.locals.user;
    //What page query
    let page = req.query.page || 1;
    //Retrieve data from the book collection
    let books = await Book.find();
    //Number of items on the page
    let perPage = 6;
    // total page
    let numPage = Math.ceil(books.length / 6);
    //Starting at item
    let n = (page - 1) * perPage;
    //Ending at item -1
    let m = page * perPage;
    //Get information about the book
    book = bookID && await Book.findOne({ _id: bookID });
    //If the existing book_id is added to the cart
    if (book) {
        user.cart.push(book._id);
        User.findOneAndUpdate({
            _id: user._id
        }, {
            cart: user.cart
        }, {
            new: true
        })
            .then()
            .catch(err => console.log(err))
    }
    res.render('./book/index', {
        books: books.slice(n, m),
        numPage: numPage,
        page: parseInt(page)
    });
}
//create book
module.exports.create = (req, res) => {
    res.render('./book/create');
}

module.exports.postCreate = (req, res) => {
    let book = new Book(req.body);
    book.save()
        .then()
        .catch(err => console.log(err));
    res.redirect('/book');
}