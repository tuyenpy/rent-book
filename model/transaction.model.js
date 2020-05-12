const {Schema, model} = require('mongoose');
const transactionSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    bookID: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;