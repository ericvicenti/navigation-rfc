/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationContainer
 * @flow
 */
'use strict';

var React = require('react-native');
var NavigationStack = require('./NavigationStack');

function NavigationContainer(Component) {
  class NavigationComponent extends React.Component {
    render() {
      return (
        <Component
          onNavigation={this.props.onNavigation || this.context.onNavigation}
          navigationStack={this.props.navigationStack || this.context.navigationStack}
          {...this.props}
        />
      );
    }
  }
  NavigationComponent.contextTypes = {
    onNavigation: React.PropTypes.func,
    navigationStack: React.PropTypes.instanceOf(NavigationStack),
  };
  NavigationComponent.childContextTypes = {};
  return NavigationComponent;
}

module.exports = NavigationContainer;
