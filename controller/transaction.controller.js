const Transaction = require('../model/transaction.model');
const User = require('../model/user.model');
const Book = require('../model/book.model');

//transaction index
module.exports.index = async (req, res) => {
    let user = res.locals.user;
    if (user) {
        //Retrive user ID information
        let userID = res.locals.user._id;
        //Retrive transaction from Transaction with user ID
        let transactions = await Transaction.find({ userID: userID })
        //Retrive books from transaction.bookID
        let books = await Promise.all(transactions.map(({ bookID }) => {
            return Book.findById(bookID)
        }));
        let newTransactions = [];
        for (let i = 0; i < transactions.length; i++) {
            let { image, title, price } = books[i];
            let { status, date } = transactions[i];
            newTransactions.push({
                image,
                title,
                price,
                status,
                date
            });
        }
        res.render('./transaction/index', { newTransactions });
        return;
    }
    res.render('./transaction/index');
}

//Create transaction
module.exports.create = (req, res) => {
    //Retrive user infomation
    let user = res.locals.user;
    //Retrive user ID from user
    let userID = user._id;
    //Retrive book ID array from user
    let bookIDs = user.cart;
    //Map book ID array and create transaction with user ID
    bookIDs.map(bookID => {
        let transaction = new Transaction({ userID, bookID });
        transaction.save()
            .then()
            .catch(err => console.log(err))
    })
    res.redirect('/transaction');
}