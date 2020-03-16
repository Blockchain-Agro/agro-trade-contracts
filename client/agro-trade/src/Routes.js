import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Home from './components/other/Home';
export default class Routes extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Home }/>
        </Switch>
      </Router>
    );
  };
}
