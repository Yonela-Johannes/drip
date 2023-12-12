import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor }from './redux/store'
import App from './App.jsx'
import "./bootstrap.min.css";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter base="/">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </HashRouter>
)
