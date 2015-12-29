'use strict';

const React = require('react-native');
const {
  AppRegistry,
} = React;

React.Navigation = require('Navigation');
React.NavigationCard = require('NavigationCard');
React.NavigationHeader = require('NavigationHeader');

const MainApp = require('./Examples/NavigationExample');

AppRegistry.registerComponent('main', () => MainApp);
