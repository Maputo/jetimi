import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import MainLayout from '../../ui/containers/MainLayout.jsx';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

Meteor.startup(() => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <MainLayout />
    </ThemeProvider>,
    document.getElementById('app')
  );
});
