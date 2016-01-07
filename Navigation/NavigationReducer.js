/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule NavigationReducer
 * @flow
 */
'use strict';

var NavigationActions = require('./NavigationActions');
var NavigationState = require('./NavigationState');

function NavigationReducer(state: NavigationState, action: NavigationActions.Abstract): NavigationState {
  if (action instanceof NavigationActions.OnRouteNavigationState) {
    const route = action.getRoute();
    const routeIndex = state.indexOf(route);
    if (routeIndex === -1) {
      return state;
    }
    const subStack = route.getNavigationState();
    const newSubStack = NavigationReducer(subStack, action.getAction());
    const newRoute = route.setNavigationState(newSubStack);
    return state.replaceAtIndex(routeIndex, newRoute);
  }
  if (action instanceof NavigationActions.Push) {
    return state.push(action.getRoute());
  }
  if (action instanceof NavigationActions.Pop) {
    if (state.size === 1) {
      return state;
    }
    return state.pop();
  }
  if (action instanceof NavigationActions.JumpTo) {
    return state.jumpToIndex(state.indexOf(action.getRoute()));
  }
  if (action instanceof NavigationActions.Reset) {
    return action.getState();
  }
  return state;
}

NavigationReducer.Actions = NavigationActions;

module.exports = NavigationReducer;
