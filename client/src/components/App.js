import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import history from '../history';
import Selection from './pages/Selection/Selection';
import Visualizer from './pages/Visualizer/Visualizer';

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/visualizer" component={Visualizer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Selection} />
        </div>
      </Router>
    );
  }
}
