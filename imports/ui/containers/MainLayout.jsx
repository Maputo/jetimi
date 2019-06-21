import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import { ThemeProvider } from '@material-ui/styles';
// import { createMuiTheme } from '@material-ui/core/styles';

import ButtonAppBar from '../components/ButtonAppBar.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Children from '../pages/Child/Children.jsx';
import NotFound from '../pages/NotFound.jsx';

// const outherTheme = createMuiTheme({
//   spacing: 4,
// });

// const innerTheme = createMuiTheme({
//   spacing: 2,
// });

export default class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {/* <ThemeProvider theme={outherTheme}> */}
          <ButtonAppBar />
          {/* <ThemeProvider theme={innerTheme}> */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/child/list' component={Children} />
            <Route component={NotFound} />
          </Switch>
          {/* </ThemeProvider> */}
          {/* </ThemeProvider> */}
        </div>
      </Router>
    );
  }
}
