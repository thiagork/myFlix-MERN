import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers.js';
import MainView from './components/main-view/main-view.jsx';
import './App.css';

const store = createStore(moviesApp);

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