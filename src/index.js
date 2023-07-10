import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import LoginProvider from './LoginProvider';
import UserDetailContext from './contexts/UserDetailContext';



// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <LoginProvider>
      <UserDetailContext>
        <App />
      </UserDetailContext>
    </LoginProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
