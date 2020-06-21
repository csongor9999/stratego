import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import { Provider } from 'react-redux';
import { configureStore } from './state/store';

export const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);
