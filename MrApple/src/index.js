import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ContentProvider } from './contexts/contentContext';
import { BlockchainContextProvider } from './contexts/BlockchainContext';

ReactDOM.render(
  <React.StrictMode>
    <BlockchainContextProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </BlockchainContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
