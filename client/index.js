import React from 'react';
// import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './stylesheets/styles.scss';
import App from './App';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);