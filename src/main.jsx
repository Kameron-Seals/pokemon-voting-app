import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Results from './pages/Results';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
