/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationRootContainer
 * @flow
 */
'use strict';

var NavigationStack = require('./NavigationStack');
var NavigationReducer = require('./NavigationReducer');
var React = require('react-native');

class NavigationRootContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: this.props.initialStack,
    };
  }
  getChildContext() {
    return {
      onNavigation: this.handleNavigation.bind(this),
      navigationStack: this.state.stack,
    };
  }
  handleNavigation(action) {
    this.setState({
      stack: this.props.reducer(this.state.stack, action),
    });
  }
  render() {
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
