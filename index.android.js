/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry
} = React;

// Horrible hack to give our examples the appearance of navigation being a part of RN:
React.NavigationState = require('./Navigation/NavigationState');
React.NavigationView = require('./Navigation/NavigationView');
React.NavigationActions = require('./Navigation/NavigationActions');
React.NavigationAnimatedView = require('./Navigation/NavigationAnimatedView');
React.NavigationReducer = require('./Navigation/NavigationReducer');
React.NavigationContainer = require('./Navigation/NavigationContainer');

React.NavigationHeader = require('./CustomComponents/NavigationHeader');
React.NavigationHeaderTitle = require('./CustomComponents/NavigationHeaderTitle');
React.NavigationCard = require('./CustomComponents/NavigationCard');

AppRegistry.registerComponent('NavigationExampleApp', () => require('./Examples/NavigationExampleMenu'));
