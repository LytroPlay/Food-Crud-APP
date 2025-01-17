import React from 'react';
import ReactDOM from 'react-dom/client'; // Perubahan di sini
import App from './App';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Perubahan di sini
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);