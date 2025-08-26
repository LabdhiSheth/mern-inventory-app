import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Book List</h1>
      <button onClick={() => navigate('/bookform')} style={{ marginBottom: '1rem', padding: '10px 15px' }}>
        Add Book
      </button>
      {books.length === 0 ? (
        <p>No books found. Add one!</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.bookName}</strong> ({book.bookType}) - Located at: {book.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;