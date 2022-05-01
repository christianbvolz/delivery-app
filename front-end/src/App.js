import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login, PagExemplo } from './Pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={ Login() } />
      <Route path="/login" element={ PagExemplo() } />
    </Routes>
  );
}

export default App;
