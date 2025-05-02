import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SongDetailPage from './SongDetailPage';
import songs from './data/songsUpdated';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App songs={songs} />} />
        <Route path="/song/:songId" element={<SongDetailPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
