const Book = require('../model/book.model');


//book index
module.exports.index = async (req, res) => {
    let books = await Book.find();
    res.render('./book/index', {books});
}
//create book
module.exports.create = (req, res) => {
    res.render('./book/create');
}

module.exports.postCreate = (req, res) => {
    let book = new Book(req.body);
    book.save()
     .then( _ => console.log('Book created'))
     .catch(err => console.log(err));
    res.redirect('/book');
}