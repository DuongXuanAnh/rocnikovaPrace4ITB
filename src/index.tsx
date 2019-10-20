import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import mainStore from './redux/store';

const store = mainStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    
document.getElementById('root'));

