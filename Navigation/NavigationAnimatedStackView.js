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

var immutable = require('immutable');

var {Map} = immutable;

/**
 * Record that contains the information for the scene view.
 */
var NavigationRouteStackTransitionRecord = immutable.Record({
  /**
   * The index of the route in the navigation route stack.
   */
  index: -1,
  /**
   * The key for the scene view.
   */
  key: '',
  /**
   * The route for the scene.
   */
  route: null,

  /**
   * Whether the target scene for the route is stale.
   * If `true`, the route is no longer in the navigation route stack while its
   * target scene may remain in the stack view.
   */
  stale: false,
});

/**
 * Helper function to compare route keys (e.g. "9", "11").
 */
function compareKey(one: string, two: string): number {
  var delta = one.length - two.length;
  if (delta > 0) {
    return 1;
  }
  if (delta < 0) {
    return -1;
  }
  return one > two ? 1 : -1;
}

/**
 * Helper function to sort records based on their stack index and view key.
 */
function compareRecords(
  one: NavigationRouteStackTransitionRecord,
  two: NavigationRouteStackTransitionRecord
): number {
  if (one.index > two.index) {
    return 1;
  }

  if (one.index < two.index) {
    return -1;
  }

  return compareKey(one.key, two.key);
}

class NavigationAnimatedStackView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.Value(this.props.stack.index),
      width: new Animated.Value(0),
      records: new Map(),
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
        style={this.props.style}>
        {this.props.stack.mapToArray(this._renderRoute, this)}
        {this._renderOverlay(this._renderOverlay, this)}
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
  _renderOverlay() {
    const {position, width} = this.state;
    return this.props.renderOverlay({
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
