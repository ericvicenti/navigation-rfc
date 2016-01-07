/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule NavigationActions
 * @flow
 */
'use strict';

var NavigationState = require('./NavigationState');

class NavigationAbstractAction {}

class NavigationPushAction extends NavigationAbstractAction {
  _route: any;
  constructor(route: any) {
    super();
    this._route = route;
  }
  getRoute(): any {
    return this._route;
  }
}

class NavigationPopAction extends NavigationAbstractAction {}

class NavigationJumpToAction extends NavigationAbstractAction {
  _route: any;
  constructor(route: any) {
    super();
    this._route = route;
  }
  getRoute(): any {
    return this._route;
  }
}

class NavigationResetAction extends NavigationAbstractAction {
  _state: NavigationState;
  constructor(state: NavigationState) {
    super();
    this._state = state;
  }
  getState(): NavigationState {
    return this._state;
  }
}

class NavigationOnRouteNavigationStateAction extends NavigationAbstractAction {
  _action: NavigationAbstractAction;
  _route: any;
  constructor(route: any, action: NavigationAbstractAction) {
    super();
    this._route = route;
    this._action = action;
  }
  getRoute(): any {
    return this._route;
  }
  getAction(): NavigationAbstractAction {
    return this._action;
  }
}

var NavigationActions = {};
NavigationActions.Abstract = NavigationAbstractAction;
NavigationActions.Push = NavigationPushAction;
NavigationActions.Pop = NavigationPopAction;
NavigationActions.JumpTo = NavigationJumpToAction;
NavigationActions.Reset = NavigationResetAction;
NavigationActions.OnRouteNavigationState = NavigationOnRouteNavigationStateAction;

module.exports = NavigationActions;
