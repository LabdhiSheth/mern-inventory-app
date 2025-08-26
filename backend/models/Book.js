const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookType: {
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Science Fiction'], // Example types
        default: 'Fiction'
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);