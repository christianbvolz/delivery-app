import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate replace to="/login" /> } />
      <Route path="/login" element={ Login() } />
    </Routes>
  );
}

export default App;
