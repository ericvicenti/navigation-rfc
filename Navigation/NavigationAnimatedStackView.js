/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationAnimatedStackView
 * @flow
 */
'use strict';

var React = require('react-native');
var NavigationStack = require('./NavigationStack');
var NavigationContainer = require('./NavigationContainer');
var {
  Animated,
  View,
} = React;

class NavigationAnimatedStackView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.Value(this.props.stack.index),
      width: new Animated.Value(0),
    };
  }
  render() {
    return (
      <View
        onLayout={(e) => {
          const {width} = e.nativeEvent.layout;
          this._lastWidth = width;
          this.state.width.setValue(width);
        }}
        style={{flex: 1}}>
        {this.props.stack.mapToArray(this._renderRoute, this)}
      </View>
    );
  }
  componentDidUpdate(lastProps) {
    if (lastProps.stack.index !== this.props.stack.index) {
      Animated.spring(
        this.state.position,
        {toValue: this.props.stack.index}
      ).start();
    }
  }
  _renderRoute(route, index, key) {
    const {position, width} = this.state;
    return this.props.renderRoute({
      route,
      index,
      key,
      position,
      width,
      lastWidth: this._lastWidth,
    });
  }
}
NavigationAnimatedStackView.propTypes = {
  stack: React.PropTypes.instanceOf(NavigationStack).isRequired,
  renderRoute: React.PropTypes.func.isRequired,
};
NavigationAnimatedStackView = NavigationContainer(NavigationAnimatedStackView);


module.exports = NavigationAnimatedStackView;
