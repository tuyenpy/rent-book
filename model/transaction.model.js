const {Schema, model} = require('mongoose');
const transactionSchema = new Schema({
    userId: String,
    name: String,
    title: String,
    date: Date
})

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;