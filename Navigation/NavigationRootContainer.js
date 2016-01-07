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
var {
  AsyncStorage,
} = React;

var invariant = require('invariant');

const NavigationRootContainer = React.createClass({
  propTypes: {
    initialState: React.PropTypes.instanceOf(NavigationState),
    renderNavigator: React.PropTypes.func,
    reducer: React.PropTypes.func,
    persistenceKey: React.PropTypes.string,
    stringToState: React.PropTypes.func,
    stateToString: React.PropTypes.func,
  },
  getDefaultProps: function(): Object {
    return {
      reducer: NavigationReducer,
    };
  },
  childContextTypes: {
    onNavigation: React.PropTypes.func,
    navigationState: React.PropTypes.instanceOf(NavigationState),
  },
  getInitialState: function(): Object {
    let navState = null;
    if (this.props.persistenceKey) {
      invariant(
        this.props.stringToState,
        'Must provide conversion from string to NavigationState to use persistence'
      );
      invariant(
        this.props.stateToString,
        'Must provide conversion from NavigationState to string to use persistence'
      );
    } else {
      navState = this.props.initialState;
    }
    return { navState };
  },
  componentDidMount: function() {
    if (this.props.persistenceKey) {
      AsyncStorage.getItem(this.props.persistenceKey, (err, storedString) => {
        if (err || !storedString) {
          this.setState({
            navState: this.props.initialState,
          });
          return;
        }
        this.setState({
          navState: this.props.stringToState(storedString),
        });
      });
    }  
  },
  getChildContext: function(): Object {
    return {
      onNavigation: this.handleNavigation,
      navigationState: this.state.navState,
    };
  },
  handleNavigation: function(action: Object) {
    const navState = this.props.reducer(this.state.navState, action);
    this.setState({
      navState,
    });
    if (this.props.persistenceKey) {
      AsyncStorage.setItem(this.props.persistenceKey, this.props.stateToString(navState));
    }
  },
  render: function(): ReactElement {
    var navigator = this.props.renderNavigator(
      this.state.navState,
      this.handleNavigation
    );
    return navigator;
  },
});

module.exports = NavigationRootContainer;
