import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import ButtonAppBar from '../components/molecules/ButtonAppBar.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import ProtegesPageContainer from '../containers/ProtegesPageContainer.jsx';
import ProfilePageContainer from '../containers/ProfilePageContainer.jsx';
import NotFound from './NotFound.jsx';
import AddProtege from '../components/organisms/AddProtege.jsx';

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
        <Route path="/p/:id" component={() => <ProfilePageContainer />} />
        <Route path="/p/new" component={AddProtege} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default MainLayout;
