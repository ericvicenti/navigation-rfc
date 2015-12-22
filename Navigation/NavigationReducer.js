/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationReducer
 * @flow
 */
'use strict';

var NavigationAction = require('./NavigationAction');
var NavigationStack = require('./NavigationStack');

function NavigationReducer(stack: NavigationStack, action: NavigationAction): NavigationStack {
  if (action instanceof NavigationAction.Push) {
    return stack.push(action.getRoute());
  }
  if (action instanceof NavigationAction.Pop) {
    return stack.pop();
  }
  if (action instanceof NavigationAction.JumpTo) {
    return stack.jumpToIndex(stack.indexOf(action.getRoute()));
  }
  if (action instanceof NavigationAction.JumpTo) {
    return stack.jumpToIndex(stack.indexOf(action.getRoute()));
  }
  if (action instanceof NavigationAction.Reset) {
    return action.getStack();
  }
}

module.exports = NavigationReducer;
