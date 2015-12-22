/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule NavigationAction
 * @flow
 */
'use strict';

var NavigationStack = require('./NavigationStack');

class NavigationAction {}

class NavigationPushAction extends NavigationAction {
  constructor(route: any) {
    super();
    this._route = route;
  }
  getRoute(): any {
    return this._route;
  }
}

class NavigationPopAction extends NavigationAction {}

class NavigationJumpToAction extends NavigationAction {
  constructor(route: any) {
    super();
    this._route = route;
  }
  getRoute(): any {
    return this._route;
  }
}

class NavigationResetAction extends NavigationAction {
  constructor(stack: NavigationStack) {
    super();
    this._stack = stack;
  }
  getStack(): NavigationStack {
    return this._stack;
  }
}

NavigationAction.Push = NavigationPushAction;
NavigationAction.Pop = NavigationPopAction;
NavigationAction.JumpTo = NavigationJumpToAction;
NavigationAction.Reset = NavigationResetAction;

module.exports = NavigationAction;
