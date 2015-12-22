/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationContainerExample
 * @flow
 */
'use strict';

var React = require('react-native');
var Navigation = require('../Navigation');
var {
  View,
  Text,
} = React;

class NavigationContainerExample extends React.Component {
  render() {
    return (
      <View>
        {this.props.navigationStack.mapToArray(tab => (
          <Text
            key={tab}
            onPress={() => {
              this.props.onNavigation(new Navigation.Action.JumpTo(tab));
            }}>
            Go to {tab}
          </Text>
        ))}
      </View>
    );
  }
}
NavigationContainerExample = Navigation.Container(NavigationContainerExample);
var NavigationContainerExampleApp = React.createClass({
  render: function() {
    var TABS = ['one', 'two', 'three'];
    return (
      <Navigation.RootContainer
        initialStack={new Navigation.Stack(TABS, 0)}
        reducer={Navigation.Reducer}
        renderNavigator={(stack) => (
          <View style={{flex:1, paddingTop: 30}}>
            <Text>Current Tab is: {stack.get(stack.index)}</Text>
            <NavigationContainerExample />
          </View>
        )}
      />
    );
  },
});

module.exports = NavigationContainerExampleApp;
