const Book = require('../model/book.model');


//book index
module.exports.index = async (req, res) => {
    let page = req.query.page || 1;
    let books = await Book.find();
    //Number of items on the page
    let perPage = 6;
    // total page
    let numPage = Math.ceil(books.length / 6);
    //Starting at item
    let n = (page - 1) * perPage;
    //Ending at item -1
    let m = page * perPage;

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
        .then(_ => console.log('Book created'))
        .catch(err => console.log(err));
    res.redirect('/book');
}