/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationBasicExample
 * @flow
 */
'use strict';

var React = require('react-native');
var Navigation = require('../Navigation');
var {
  View,
  Text,
} = React;

var NavigationBasicExample = React.createClass({
  render: function() {
    return (
      <Navigation.RootContainer
        initialStack={new Navigation.Stack(['first page'], 0)}
        reducer={Navigation.Reducer}
        renderNavigator={(stack, onNavigation) => (
          <View style={{flex:1, paddingTop: 30}}>
            <Text onPress={() => {
              onNavigation(new Navigation.Action.Push('second page'));
            }}>
              {stack.get(stack.index)}
            </Text>
          </View>
        )}
      />
    );
  },
});

module.exports = NavigationBasicExample;
