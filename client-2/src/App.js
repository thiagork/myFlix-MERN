import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers.js';
import MainView from './components/main-view/main-view.jsx';
import './App.css';

const store = createStore(
  moviesApp, 
  applyMiddleware(thunk)
);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

export default App;