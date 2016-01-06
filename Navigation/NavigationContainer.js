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
var NavigationStack = require('./NavigationStack');
var NavigationRootContainer = require('./NavigationRootContainer');

function createNavigationContainer(Component: React.Component): React.Component {
  class NavigationComponent extends React.Component {
    render() {
      return (
        <Component
          onNavigation={this.getNavigationHandler.call(this)}
          navigationStack={this.getNavigationStack.call(this)}
          {...this.props}
        />
      );
    }
    getNavigationHandler() {
      return this.props.onNavigation || this.context.onNavigation;
    }
    getNavigationStack() {
      return this.props.navigationStack || this.context.navigationStack;
    }
    getChildContext() {
      return {
        onNavigation: this.getNavigationHandler.call(this),
        navigationStack: this.getNavigationStack.call(this),
      };
    }
  }
  NavigationComponent.contextTypes = {
    onNavigation: React.PropTypes.func,
    navigationStack: React.PropTypes.instanceOf(NavigationStack),
  };
  NavigationComponent.childContextTypes = {
    onNavigation: React.PropTypes.func,
    navigationStack: React.PropTypes.instanceOf(NavigationStack),
  };
  return NavigationComponent;
}

var NavigationContainer = {
  create: createNavigationContainer,
  RootContainer: NavigationRootContainer,
};


module.exports = NavigationContainer;
