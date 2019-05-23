import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './store/reducers/index';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import { loginSuccess } from './store/actions/auth';

const store = createStore(rootReducer, applyMiddleware(thunk));

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
  store.dispatch(
    loginSuccess(
      currentUser.id,
      currentUser.hotel_id,
      currentUser.email,
      currentUser.token,
      currentUser.user_type,
      currentUser.name
    )
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
