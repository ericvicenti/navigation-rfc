/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule NavigationAnimatedView
 * @flow-broken
 */
'use strict';

var Animated = require('Animated');
var Map = require('Map');
var NavigationState = require('NavigationState');
var NavigationContainer = require('NavigationContainer');
var React = require('react-native');
var View = require('View');

var invariant = require('invariant');

import type NavigationRoute from 'NavigationState';

type NavigationScene = {
  index: number,
  route: NavigationRoute,
  isStale: ?boolean,
};

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
 * Helper function to sort scenes based on their index and view key.
 */
function compareScenes(
  one: NavigationScene,
  two: NavigationScene
): number {
  if (one.index > two.index) {
    return 1;
  }

  if (one.index < two.index) {
    return -1;
  }

  return compareKey(
    NavigationState.getKey(one.route),
    NavigationState.getKey(two.route)
  );
}

var NavigationAnimatedView = React.createClass({
  propTypes: {
    navigationState: React.PropTypes.object.isRequired,
    renderScene: React.PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      width: new Animated.Value(this._lastWidth),
      height: new Animated.Value(this._lastHeight),
      position: new Animated.Value(this.props.navigationState.index),
      scenes: new Map(),
    };
  },
  componentWillMount: function() {
    this.setState({
      scenes: this._reduceScenes(this.state.scenes, this.props.navigationState),
    });
  },
  componentDidMount: function() {
    this._postionListener = this.state.position.addListener(this._onProgressChange);
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.navigationState !== this.props.navigationState) {
      this.setState({
        scenes: this._reduceScenes(this.state.scenes, nextProps.navigationState, this.props.navigationState),
      });
    }
  },
  componentDidUpdate: function(lastProps) {
    if (lastProps.navigationState.index !== this.props.navigationState.index) {
      Animated.spring(
        this.state.position,
        {toValue: this.props.navigationState.index}
      ).start();
    }
  },
  componentWillUnmount: function() {
    if (this._postionListener) {
      this.state.position.removeListener(this._postionListener);
      this._postionListener = null;
    }
  },
  _onProgressChange: function(data: Object): void {
    if (data.value !== this.props.navigationState.index) {
      return;
    }
    this.state.scenes.forEach((scene, index) => {
      if (scene.isStale) {
        const scenes = this.state.scenes.slice();
        scenes.splice(index, 1);
        this.setState({ scenes, });
      }
    });
  },
  _reduceScenes: function(
    scenes: Array<NavigationScene>,
    nextState: NavigationState,
    lastState: ?NavigationState
  ): Array<NavigationScene> {
    let nextScenes = nextState.routes.map((route, index) => {
      return {
        index,
        route,
      };
    });

    if (lastState) {
      lastState.routes.forEach((route, index) => {
        const key = NavigationState.getKey(route);
        if (!NavigationState.get(nextState, key)) {
          nextScenes.push({
            index,
            route,
            isStale: true,
          });
        }
      });
    }

    console.log('BALAAA', nextScenes)

    nextScenes = nextScenes.sort(compareScenes);

    return nextScenes;
  },
  render() {
    return (
      <View
        onLayout={(e) => {
          const {height, width} = e.nativeEvent.layout;
          this._lastHeight = height;
          this._lastWidth = width;
          this.state.height.setValue(height);
          this.state.width.setValue(width);
        }}
        style={this.props.style}>
        {this.state.scenes.map(this._renderScene, this)}
        {this._renderOverlay(this._renderOverlay, this)}
      </View>
    );
  },
  _getLayout: function() {
    const {height, width} = this.state;
    return {
      height,
      width,
      initWidth: this._lastWidth,
      initHeight: this._lastHeight,
    };
  },
  _renderScene: function(scene: NavigationScene) {
    return this.props.renderScene(
      scene.route,
      scene.index,
      this.props.navigationState,
      this.state.position,
      this._getLayout()
    );
  },
  _renderOverlay: function() {
    return this.props.renderOverlay(
      this.props.navigationState,
      this.state.position,
      this._getLayout()
    );
  },
});

NavigationAnimatedView = NavigationContainer.create(NavigationAnimatedView);

module.exports = NavigationAnimatedView;
