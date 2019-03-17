import React from 'react';
import ReactDOM from 'react-dom';
import './assets/App.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import reducers from './reducers';

const enhanceComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhance = enhanceComposer(applyMiddleware(thunk));
const store = createStore(reducers, enhance);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
