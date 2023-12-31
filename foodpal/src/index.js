import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LogInPage from './components/LogInPage2';
import YourProfilePage from './components/YourProfilePage';
import SearchPage from './components/SearchPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "logIn",
    element: <LogInPage />
  },
  {
    path: "yourProfile",
    element: <YourProfilePage />
  },
  {
    path: "search",
    element: <SearchPage />
  }, 
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
