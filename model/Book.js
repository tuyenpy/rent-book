const {Schema, model} = require('mongoose');
const bookSchema = new Schema({
    title: String,
    description: String
});

const Book = model('Book', bookSchema );

module.exports = Book;
