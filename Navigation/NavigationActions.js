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

function NavigationPushAction(route: any) {
  return {
    type: 'navigation-rfc/push',
    route,
  };
}

function NavigationPopAction() {
  return {
    type: 'navigation-rfc/pop',
  };
}

function NavigationJumpToAction(route: any) {
  return {
    type: 'navigation-rfc/jumpTo',
  };
}

function NavigationResetAction(routes: Array<any>, index: number) {
  return {
    type: 'navigation-rfc/reset',
    routes,
    index,
  };
}

function NavigationOnRouteNavigationStateAction(route: any, action: Object) {
  return {
    type: 'navigation-rfc/onRouteAction',
    route,
    action,
  };
}

var NavigationActions = {};
NavigationActions.Push = NavigationPushAction;
NavigationActions.Pop = NavigationPopAction;
NavigationActions.JumpTo = NavigationJumpToAction;
NavigationActions.Reset = NavigationResetAction;
NavigationActions.OnRouteNavigationState = NavigationOnRouteNavigationStateAction;

module.exports = NavigationActions;
