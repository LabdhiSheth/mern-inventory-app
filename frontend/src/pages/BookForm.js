import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const [bookName, setBookName] = useState('');
  const [bookType, setBookType] = useState('Fiction'); // Default value
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login as user is not authenticated
      navigate('/login');
    }
  }, [navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/books', {
      //   bookName,
      //   bookType,
      //   location,
      // });
      bookName,
          bookType,
          location,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setSuccess(`Successfully added "${response.data.bookName}"! Redirecting...`);
      // Reset form
      setBookName('');
      setBookType('Fiction');
      setLocation('');
      // Navigate to the book list page after a short delay
      setTimeout(() => {
        navigate('/booklist');
      }, 1500);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Token is invalid or expired, redirect to login
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(err.response?.data?.message || 'Failed to add book. Please try again.');
      console.error('Error adding book:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h1>Add a New Book</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            id="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="bookType">Book Type:</label>
          <select
            id="bookType"
            value={bookType}
            onChange={(e) => setBookType(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            {/* Add more genres as needed */}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px' }}>Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;

// import React from 'react';

// const BookForm = () => {
//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Book Form</h1>
//       <p>This is your book form page, directly accessible without login.</p>
//       {/* You can add your form elements here */}
//       <form>
//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="bookTitle">Book Title: </label>
//           <input type="text" id="bookTitle" name="bookTitle" />
//         </div>
//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="author">Author: </label>
//           <input type="text" id="author" name="author" />
//         </div>
//         <button type="submit">Add Book</button>
//       </form>
//     </div>
//   );
// };

// export default BookForm;

