const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const bookSchema = new Schema({
    name:String,
    author:String
})

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;