/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationHeaderView
 * @flow
 */
'use strict';

var React = require('react-native');
var NavigationAction = require('./NavigationAction');
var NavigationStack = require('./NavigationStack');
var NavigationContainer = require('./NavigationContainer');
var {
  Animated,
  PanResponder,
  View,
  Text,
  StyleSheet,
} = React;

class NavigationHeaderView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    var stack = this.props.navigationStack;
    return (
      <Animated.View
        style={[
          styles.header,
        ]}>
        {stack.mapToArray(this._renderTitle.bind(this))}
      </Animated.View>
    );
  }
  _renderTitle(route, index, key) {
    return (
      <Animated.Text
        style={[
          styles.title,
          {opacity: this.props.position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
          })},
        ]}>
        {this.props.getTitle(route)}
      </Animated.Text>
    );
  }
}
NavigationHeaderView.propTypes = {
  navigationStack: React.PropTypes.instanceOf(NavigationStack),
  getTitle: React.PropTypes.func.isRequired,
};
NavigationHeaderView = NavigationContainer(NavigationHeaderView);

var styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#0A0A0A',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
  },
  header: {
    flex: 1,
    backgroundColor: '#EFEFF2',
    paddingTop: 20,
    top: 0,
    height: 64,
    right: 0,
    left: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
    position: 'absolute',
  },
});

module.exports = NavigationHeaderView;
