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

var AsyncStorage = require('AsyncStorage');
var NavigationReducer = require('NavigationReducer');
var React = require('React');

var invariant = require('invariant');

const NavigationRootContainer = React.createClass({
  propTypes: {
    initialState: React.PropTypes.object.isRequired,
    renderNavigator: React.PropTypes.func.isRequired,
    reducer: React.PropTypes.func,
    persistenceKey: React.PropTypes.string,
    stringToRoute: React.PropTypes.func,
    routeToString: React.PropTypes.func,
  },
  getDefaultProps: function(): Object {
    return {
      reducer: NavigationReducer,
      stringToRoute: JSON.parse,
      routeToString: JSON.stringify,
    };
  },
  childContextTypes: {
    onNavigation: React.PropTypes.func,
    navigationState: React.PropTypes.object,
  },
  getInitialState: function(): Object {
    let navState = null;
    if (this.props.persistenceKey) {
      invariant(
        this.props.stringToRoute,
        'Must provide conversion from string to NavigationRoute to use persistence'
      );
      invariant(
        this.props.routeToString,
        'Must provide conversion from NavigationRoute to string to use persistence'
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
          /* $FlowFixMe - default props will ensure this prop is not undefined */
          navState: this.props.stringToRoute(storedString),
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
    /* $FlowFixMe - default props will ensure this prop is not undefined */
    const navState = this.props.reducer(this.state.navState, action);
    this.setState({
      navState,
    });
    if (this.props.persistenceKey) {
      /* $FlowFixMe - default props will ensure this prop is not undefined */
      AsyncStorage.setItem(this.props.persistenceKey, this.props.routeToString(navState));
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
