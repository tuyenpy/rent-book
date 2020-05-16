const User = require('../../model/user.model');
const Book = require('../../model/book.model');
const uploadCloudinary = require('../../config/uploadCloudinary');


//book index
module.exports.index = async (req, res) => {
    //Search -> Retrive query infomation
    let search = req.body.search;
    //The book will add to the cart
    let book, books;
    //If the user adds to the cart
    let bookID = req.query.addtocart;
    //Retrieve user information
    let user = res.locals.user;
    //What page query
    let page = req.query.page || 1;
    //Retrieve data from the books collection
    // let books = await Book.find();
    if (search) {
        //If have search query
        books = await Book.find({$or: [
            {
                title: search
            }, {
                description: search
            }
        ]});
    } else {
        //If have not search query
        books = await Book.find();
    }
    //Number of items on the page
    let perPage = 6;
    // total page
    let numPage = Math.ceil(books.length / 6);
    //Starting at item
    let n = (page - 1) * perPage;
    //Ending at item -1
    let m = page * perPage;
    //Add to cart -> Get information about the book
    book = bookID && await Book.findOne({ _id: bookID });
    //If the existing book_id is added to the cart
    if (book) {
        //Add to cart
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
    // res.render('./book/index', {
    //     books: books.slice(n, m),
    //     numPage: numPage,
    //     page: parseInt(page)
    // });
    console.log(req.body);
    res.json(books);
}
//create book
module.exports.create = (req, res) => {
    res.render('./book/create');
}

module.exports.postCreate = async (req, res) => {
    let { title, description, author, price } = req.body;

    // upload to server-side
    // let image = req.file.path.split('\\').slice(1).join('\\');

    //upload to cloudinary through server-side
    let image = req.file && await uploadCloudinary(req.file.path, 'books');

    //create user
    let book = new Book({ title, description, author, price, image });

    book.save()
        .then()
        .catch(({ message }) => console.log(message));
    res.redirect('/book');
}