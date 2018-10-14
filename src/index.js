import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/index'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './App'

// Google fonts typeface
import 'typeface-montserrat'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)