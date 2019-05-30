import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ButtonAppBar from '../components/ButtonAppBar.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import NotFound from '../pages/NotFound.jsx';

export default class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ButtonAppBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
