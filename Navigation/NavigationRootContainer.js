/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule NavigationRootContainer
 * @flow
 */
'use strict';

var NavigationStack = require('./NavigationStack');
var NavigationReducer = require('./NavigationReducer');
var React = require('react-native');

class NavigationRootContainer extends React.Component {
  constructor(props: Object) {
    super(props);
    console.log('evv- wat')
    this.state = {
      stack: this.props.initialStack,
    };
  }
  getChildContext(): Object {
    return {
      onNavigation: this.handleNavigation.bind(this),
      navigationStack: this.state.stack,
    };
  }
  handleNavigation(action: Object) {
    this.setState({
      stack: this.props.reducer(this.state.stack, action),
    });
  }
  render(): ReactElement {
    var navigator = this.props.renderNavigator(
      this.state.stack,
      this.handleNavigation.bind(this)
    );
    return navigator;
  }
}
NavigationRootContainer.propTypes = {
  initialStack: React.PropTypes.instanceOf(NavigationStack),
  renderNavigator: React.PropTypes.func,
  reducer: React.PropTypes.func,
};
NavigationRootContainer.defaultProps = {
  reducer: NavigationReducer,
};
NavigationRootContainer.childContextTypes = {
  onNavigation: React.PropTypes.func,
  navigationStack: React.PropTypes.instanceOf(NavigationStack),
};

module.exports = NavigationRootContainer;
