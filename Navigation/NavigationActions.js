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

import type {NavigationRoute} from 'NavigationState';

export type NavigationAction = {
  type: string,
};

const ActionTypes = {
  PUSH: 'navigation-rfc/push',
  POP: 'navigation-rfc/pop',
  JUMP_TO: 'navigation-rfc/jumpTo',
  RESET: 'navigation-rfc/reset',
  ON_ROUTE_KEY: 'navigation-rfc/onRouteKey',
};

const _ActionValues = Object.keys(ActionTypes).map(k => ActionTypes[k]);

function NavigationPushAction(route: NavigationRoute): NavigationAction {
  return {
    type: ActionTypes.PUSH,
    route,
  };
}

function NavigationPopAction(): NavigationAction {
  return {
    type: ActionTypes.POP,
  };
}

function NavigationJumpToAction(key: string): NavigationAction {
  return {
    type: ActionTypes.JUMP_TO,
    key,
  };
}

function NavigationResetAction(routes: Array<NavigationRoute>, index: number): NavigationAction {
  return {
    type: ActionTypes.RESET,
    index,
    routes,
  };
}

function NavigationOnRouteKeyAction(key: string, action: NavigationAction): NavigationAction {
  return {
    type: ActionTypes.ON_ROUTE_KEY,
    key,
    action,
  };
}

function isNavigationAction(action: Object): boolean {
  return _ActionValues.indexOf(action.type) !== -1; 
}

var NavigationActions = {
  Push: NavigationPushAction,
  Pop: NavigationPopAction,
  JumpTo: NavigationJumpToAction,
  Reset: NavigationResetAction,
  OnRouteKey: NavigationOnRouteKeyAction,

  isNavigationAction,
  Types: ActionTypes,
};

module.exports = NavigationActions;
