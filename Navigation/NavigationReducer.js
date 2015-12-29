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

var NavigationAction = require('./NavigationAction');
var NavigationStack = require('./NavigationStack');

function NavigationReducer(stack: NavigationStack, action: NavigationAction.Abstract): NavigationStack {
  if (action instanceof NavigationAction.OnRouteNavigationStack) {
    const route = action.getRoute();
    const routeIndex = stack.indexOf(route);
    if (routeIndex === -1) {
      return stack;
    }
    const subStack = route.getNavigationStack();
    const newSubStack = NavigationReducer(subStack, action.getAction());
    const newRoute = route.setNavigationStack(newSubStack);
    return stack.replaceAtIndex(routeIndex, newRoute);
  }
  if (action instanceof NavigationAction.Push) {
    return stack.push(action.getRoute());
  }
  if (action instanceof NavigationAction.Pop) {
    if (stack.size === 1) {
      return stack;
    }
    return stack.pop();
  }
  if (action instanceof NavigationAction.JumpTo) {
    return stack.jumpToIndex(stack.indexOf(action.getRoute()));
  }
  if (action instanceof NavigationAction.Reset) {
    return action.getStack();
  }
  return stack;
}

module.exports = NavigationReducer;
