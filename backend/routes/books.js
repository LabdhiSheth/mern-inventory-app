const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET route to fetch all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST route to create a new book
router.post('/', async (req, res) => {
    try {
        const { bookName, bookType, location } = req.body;
        const newBook = new Book({
            bookName,
            bookType,
            location
        });
        const book = await newBook.save();
        res.status(201).json(book); // Respond with the created book
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;