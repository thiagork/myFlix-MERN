/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import './index.scss'; // to add it to the bundle

// Main
class MyFlixApplication extends React.Component {
    render() {
        return <MainView />;
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);