import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import ChatUI from './chatui';
import reportWebVitals from './reportWebVitals';
import {Welcome} from './welcome';
// import {AddUser} from './addUser';
const currentPath = window.location.pathname;
const pathParts = currentPath.split('/');

let Component;
if (currentPath === '/') {
  Component = Welcome;
} else if (pathParts[1] === 'api' && pathParts[2] === 'user' && pathParts.length === 5) {
  // alert(pathParts)
  Component = ChatUI;
} else {
  // Handle other routes or return an error
  Component = () => <div>Invalid URL</div>;
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Component />
    {/* <Users/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
