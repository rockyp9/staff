import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Exchange from './Exchange';
import Terms from './Terms';
import * as serviceWorker from './serviceWorker';
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Await from './Await';

const PUBLISHABLE_KEY = process.env.REACT_APP_VITE_AUTH_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
ReactDOM.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <App />
            }
          />
          <Route
            path="/terms"
            element={
              <Terms />
            }
          />
          <Route
            path="/exchange"
            element={
              <Exchange />
            }
          />
          <Route
            path="/await"
            element={
              <Await />
            }
          />

        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
