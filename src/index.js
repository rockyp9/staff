import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ClerkProvider } from '@clerk/clerk-react'


// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }
ReactDOM.render(
  <React.StrictMode>
    <ClerkProvider publishableKey="pk_test_Zmx1ZW50LWd1cHB5LTkxLmNsZXJrLmFjY291bnRzLmRldiQ" afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
