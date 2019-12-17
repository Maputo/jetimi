import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import ButtonAppBar from '../components/ButtonAppBar.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import ProtegesPageContainer from './ProtegesPageContainer.jsx';
import Profile from '../pages/Protege/ProfilePage.jsx';
import NotFound from '../pages/NotFound.jsx';

const theme = createMuiTheme();

const MainLayout = () => (
  <Router>
    <div>
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
      </ThemeProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/p/list" component={() => <ProtegesPageContainer />} />
        <Route path="/p/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default MainLayout;
