import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import MainLayout from '../../ui/pages/MainLayout.jsx';

const theme = createMuiTheme();

Meteor.startup(() => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <MainLayout />
    </ThemeProvider>,
    document.getElementById('app'),
  );
});
