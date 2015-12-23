/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule Navigation
 * @flow
 */
'use strict';

var Navigation = {
  Action: require('./NavigationAction'),
  Reducer: require('./NavigationReducer'),
  Stack: require('./NavigationStack'),
  AnimatedStackView: require('./NavigationAnimatedStackView'),
  HeaderView: require('./NavigationHeaderView'),
  CardView: require('./NavigationCardView'),
  RootContainer: require('./NavigationRootContainer'),
  Container: require('./NavigationContainer'),
};

module.exports = Navigation;