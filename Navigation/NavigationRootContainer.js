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

var NavigationState = require('./NavigationState');
var NavigationReducer = require('./NavigationReducer');
var React = require('react-native');

class NavigationRootContainer extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      navState: this.props.initialState,
    };
  }
  getChildContext(): Object {
    return {
      onNavigation: this.handleNavigation.bind(this),
      navigationState: this.state.navState,
    };
  }
  handleNavigation(action: Object) {
    this.setState({
      navState: this.props.reducer(this.state.navState, action),
    });
  }
  render(): ReactElement {
    var navigator = this.props.renderNavigator(
      this.state.navState,
      this.handleNavigation.bind(this)
    );
    return navigator;
  }
}
NavigationRootContainer.propTypes = {
  initialState: React.PropTypes.instanceOf(NavigationState),
  renderNavigator: React.PropTypes.func,
  reducer: React.PropTypes.func,
};
NavigationRootContainer.defaultProps = {
  reducer: NavigationReducer,
};
NavigationRootContainer.childContextTypes = {
  onNavigation: React.PropTypes.func,
  navigationState: React.PropTypes.instanceOf(NavigationState),
};

module.exports = NavigationRootContainer;
