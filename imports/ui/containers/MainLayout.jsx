import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ButtonAppBar from '../components/ButtonAppBar.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Children from '../pages/Child/Children.jsx';
import NotFound from '../pages/NotFound.jsx';

const theme = createMuiTheme();

export default class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <MuiThemeProvider theme={theme}>
            <ButtonAppBar />
          </MuiThemeProvider>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/child/list' component={Children} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
