/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationAnimatedCardView
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
} = React;

class NavigationCardView extends React.Component {
  constructor(props) {
    super(props);
    this._responder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, {dx, dy, moveX, moveY, x0, y0}) => {
        if (this.props.navigationStack.index === 0) {
          return false;
        }
        if (moveX > 30) {
          return false;
        }
        if (dx > 5 && Math.abs(dy) < 4) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (e, {dx, dy, moveX, moveY, x0, y0}) => {
      },
      onPanResponderMove: (e, {dx}) => {
        this.props.position.setValue((- dx / this._lastWidth) + this.props.index);
      },
      onPanResponderRelease: (e, {vx, dx}) => {
        const xRatio = dx / this._lastWidth;
        const doesPop = (xRatio + vx) > 0.45;
        if (doesPop) {
          this.props.onNavigation(new NavigationAction.Pop({ velocity: vx }));
          return;
        }
        Animated.spring(this.props.position, {
          toValue: this.props.navigationStack.index
        }).start();
      },
      onPanResponderTerminate: (e, {vx, dx}) => {
        Animated.spring(this.props.position, {
          toValue: this.props.navigationStack.index
        }).start();
      },
    });
  }
  componentDidMount() {
    this._lastWidth = this.props.lastWidth;
    this._widthListener = this.props.width.addListener(({value}) => {
      this._lastWidth = value;
    });
  }
  componentWillUnmount() {
    this.props.width.removeListener(this._widthListener);
  }
  render() {
    const cardPosition = Animated.add(this.props.position, new Animated.Value(-this.props.index));
    const gestureValue = Animated.multiply(cardPosition, this.props.width);
    return (
      <Animated.View
        {...this._responder.panHandlers}
        style={{
          backgroundColor: '#E9E9EF',
          shadowColor: 'black',
          shadowOpacity: 0.4,
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 10,
          paddingTop: 64,
          top: 0,
          bottom: 0,
          right: gestureValue,
          left: gestureValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -1],
          }),
          position: 'absolute',
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}
NavigationCardView.propTypes = {
  navigationStack: React.PropTypes.instanceOf(NavigationStack),
};
NavigationCardView = NavigationContainer(NavigationCardView);

module.exports = NavigationCardView;
