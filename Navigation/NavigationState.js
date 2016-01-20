/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule NavigationState
 * @flow
 */
'use strict';

export type NavigationRoute = string | {
  key: string;
  index: ?number;
  routes: ?Array<NavigationRoute>;
};

export function getKey(navState: NavigationRoute): string {
  if (typeof navState === 'string') {
    return navState;
  } else if (navState instanceof Object && typeof navState.key === 'string') {
    return navState.key;
  }
  invariant(
    false,
    `NavigationRoute.getKey requires a NavigationRoute must have a key string or be a string`
  );
}

export function isParent(input: any): boolean {
  return (
    (input instanceof Object) &&
    (input.routes instanceof Array) &&
    (input.routes[0] !== undefined) &&
    (typeof input.index === 'number') &&
    (input.routes[input.index] !== undefined)
  );
}

export function get(navState: NavigationRoute, key: string): ?NavigationRoute {
  invariant(
    isParent(navState),
    'Cannot push on a NavigationRoute that is not a parent'
  );
  const route = navState.routes.find(route => getKey(route) === key);
  return route || null;
}

export function push(navState: NavigationRoute, route: NavigationRoute): NavigationRoute {
  invariant(
    isParent(navState),
    'Cannot push on a NavigationRoute that is not a parent'
  );
  var lastRoutes: Array<NavigationRoute> = navState.routes;
  return {
    ...navState,
    routes: [
      ...lastRoutes,
      route,
    ],
    index: lastRoutes.length,
  };
}

export function pop(navState: NavigationRoute): NavigationRoute {
  invariant(
    isParent(navState),
    'Cannot push on a NavigationRoute that is not a parent'
  );
  var lastRoutes: Array<NavigationRoute> = navState.routes;
  return {
    ...navState,
    routes: lastRoutes.slice(0, lastRoutes.length - 1),
    index: lastRoutes.length - 2,
  };
}

export function jumpToIndex(navState: NavigationRoute, index: number): NavigationRoute {
  invariant(
    isParent(navState),
    'Cannot jumpTo on a NavigationRoute that is not a parent'
  );
  return {
    ...navState,
    index,
  };
}

export function jumpTo(navState: NavigationRoute, key: string): NavigationRoute {
  invariant(
    isParent(navState),
    'Cannot jumpTo on a NavigationRoute that is not a parent'
  );
  const index = navState.routes.indexOf(navState.routes.find(route => getKey(route) === key));
  invariant(
    index !== -1,
    'Cannot find route with matching key in this NavigationRoute'
  );
  return {
    ...navState,
    index,
  };
}

export function replaceAt(navState: NavigationRoute, key: string, newRoute: NavigationRoute): NavigationRoute {
  invariant(
    isParent(navState),
    'Cannot jumpTo on a NavigationRoute that is not a parent'
  );
  const routes = [...navState.routes];
  const index = navState.routes.indexOf(navState.routes.find(route => getKey(route) === key));
  invariant(
    index !== -1,
    'Cannot find route with matching key in this NavigationRoute'
  );
  routes[index] = newRoute;
  return {
    ...navState,
    routes,
  };
}

export function replaceAtIndex(navState: NavigationRoute, index: number, newRoute: NavigationRoute): NavigationRoute {
  invariant(
    isParent(navState),
    'Cannot jumpTo on a NavigationRoute that is not a parent'
  );
  const routes = [...navState.routes];
  routes[index] = newRoute;
  return {
    ...navState,
    routes,
  };
}

