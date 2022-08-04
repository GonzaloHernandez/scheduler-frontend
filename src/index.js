import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Hello(props) {
  return (
    <h2>This project will show the scheduler interface</h2>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello/>);
