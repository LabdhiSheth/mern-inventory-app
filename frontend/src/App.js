import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookForm from './components/BookForm'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add a route for the BookForm */}
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/" element={<Navigate to="/login" />} />


      </Routes>
 </Router>
  );
}

export default App;
