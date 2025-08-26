import React, { useState } from 'react';

const BookForm = () => {
    const [bookName, setBookName] = useState('');
    const [bookType, setBookType] = useState('Fiction'); // Default value
    const [location, setLocation] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send data to backend
        fetch('http://localhost:8080/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookName, bookType, location })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // Reset form fields after submission (optional)
        setBookName('');
        setBookType('Fiction');
        setLocation('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="bookName">Book Name:</label>
                <input type="text" id="bookName" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="bookType">Book Type:</label>
                <select id="bookType" value={bookType} onChange={(e) => setBookType(e.target.value)}>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science Fiction">Science Fiction</option>
                    {/* Add more genres as needed */}
                </select>
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default BookForm;