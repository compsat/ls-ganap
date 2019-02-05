import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import './style/style-global';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
