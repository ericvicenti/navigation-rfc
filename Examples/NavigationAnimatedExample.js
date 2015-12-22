/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationAnimatedExample
 * @flow
 */
'use strict';

var React = require('react-native');
var Navigation = require('../Navigation');
var {
  View,
  Text,
} = React;

class NavigationAnimatedExample extends React.Component {
  render() {
    return (
      <Navigation.RootContainer
        initialStack={new Navigation.Stack([ 'First Route' ], 0)}
        renderNavigator={(stack, onNavigation) => (
          <Navigation.AnimatedStackView
            stack={stack}
            renderRoute={(props) => (
              <Navigation.CardView
                {...props }>
                <Text onPress={() => {
                  onNavigation(new Navigation.Action.Push('Another Route'));
                }}>Push!</Text>
              </Navigation.CardView>
            )}
          />
        )}
      />
    );
  }
}

module.exports = NavigationAnimatedExample;
