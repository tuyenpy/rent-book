const {Schema, model} = require('mongoose');
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Book = model('Book', bookSchema );

module.exports = Book;
