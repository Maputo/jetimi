import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import MainLayout from '../../ui/containers/MainLayout.jsx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

Meteor.startup(() => {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <MainLayout />
    </MuiThemeProvider>,
    document.getElementById('app')
  );
});
