import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
import BookForm from './pages/BookForm';
import BookList from './pages/BookList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bookform" element={<BookForm />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Navigate to="/bookform" />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/" element={<Navigate to="/bookform" />} /> 
        <Route path="/" element={<Navigate to="/booklist" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
