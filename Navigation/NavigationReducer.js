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

var NavigationActions = require('NavigationActions');
var NavigationState = require('NavigationState');

import type {NavigationRoute} from 'NavigationState';
import type NavigationAction from 'NavigationActions';

function NavigationReducer(currentRoute: NavigationRoute, action: Object): NavigationRoute {
  if (!NavigationState.isParent(currentRoute)) {
    return currentRoute;
  }
  switch (action.type) {
    case NavigationActions.Types.PUSH:
      return NavigationState.push(currentRoute, action.route);
    case NavigationActions.Types.POP:
      if (currentRoute.index === 0 || currentRoute.routes.length === 1) {
        return currentRoute;
      }
      return NavigationState.pop(currentRoute);
    case NavigationActions.Types.JUMP_TO:
      return NavigationState.jumpTo(
        currentRoute,
        action.key
      );
    case NavigationActions.Types.RESET:
      return { index: action.index, routes: action.routes, };
    case NavigationActions.Types.ON_ROUTE_KEY:
      return NavigationState.replaceAt(
        currentRoute,
        action.key,
        NavigationReducer(
          NavigationState.get(currentRoute, action.key),
          action.action
        )
      );
  }
  return currentRoute;
}

NavigationReducer.Actions = NavigationActions;

module.exports = NavigationReducer;
