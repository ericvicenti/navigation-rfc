/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule NavigationContainer
 * @flow
 */
'use strict';

var React = require('react-native');
var NavigationState = require('./NavigationState');
var NavigationRootContainer = require('./NavigationRootContainer');

function createNavigationContainer(Component: React.Component): React.Component {
  class NavigationComponent extends React.Component {
    render() {
      return (
        <Component
          onNavigation={this.getNavigationHandler.call(this)}
          navigationState={this.getNavigationState.call(this)}
          {...this.props}
        />
      );
    }
    getNavigationHandler() {
      return this.props.onNavigation || this.context.onNavigation;
    }
    getNavigationState() {
      return this.props.navigationState || this.context.navigationState;
    }
    getChildContext() {
      return {
        onNavigation: this.getNavigationHandler.call(this),
        navigationState: this.getNavigationState.call(this),
      };
    }
  }
  NavigationComponent.contextTypes = {
    onNavigation: React.PropTypes.func,
    navigationState: React.PropTypes.instanceOf(NavigationState),
  };
  NavigationComponent.childContextTypes = {
    onNavigation: React.PropTypes.func,
    navigationState: React.PropTypes.instanceOf(NavigationState),
  };
  return NavigationComponent;
}

var NavigationContainer = {
  create: createNavigationContainer,
  RootContainer: NavigationRootContainer,
};


module.exports = NavigationContainer;
