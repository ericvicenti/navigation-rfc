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

var immutable = require('immutable');
var invariant = require('invariant');

type IterationCallback = (route: any, index: number, key: string) => void;

var {List, Set, Record} = immutable;

function isRouteEmpty(route: any): boolean {
  return (route === undefined || route === null || route === '') || false;
}

var _nextID = 0;

class RouteNode {
  key: string;
  value: any;
  constructor(route: any) {
    // Key value gets bigger incrementally. Developer can compare the
    // keys of two routes then know which route is added to the state
    // earlier.
    this.key = String(_nextID++);

    this.value = route;
  }
}

var StackDiffRecord = Record({
  key: null,
  route: null,
  index: null,
});

/**
 * An immutable route list with an index, used to model the navigation of an app
 */
class NavigationState {
  _index: number;

  _routeNodes: List<RouteNode>;

  constructor(routeArray: Array<any>, index: number) {
    let routeNodes: List;

    // Internally, NavigationState uses an immutable `List` to keep track of routes.
    // To keep the API simple, allow developers to pass in an array of raw routes
    if (routeArray instanceof List) {
      routeNodes = routeArray;
    } else {
      routeNodes = new List(routeArray);
    }

    routeNodes = routeNodes.map((route) => {
      if (route instanceof RouteNode) {
        return route;
      }
      invariant(!isRouteEmpty(route), 'route must not be mepty');
      return new RouteNode(route);
    });

    invariant(
      routeNodes.size > 0,
      'size must not be empty'
    );

    invariant(
      index > -1 && index <= routeNodes.size - 1,
      'index out of bound'
    );

    this._routeNodes = routeNodes;
    this._index = index;
  }

  /* $FlowFixMe - get/set properties not yet supported */
  get size(): number {
    return this._routeNodes.size;
  }

  /* $FlowFixMe - get/set properties not yet supported */
  get index(): number {
    return this._index;
  }

  toArray(): Array<any> {
    var result = [];
    var ii = 0;
    var nodes = this._routeNodes;
    while (ii < nodes.size) {
      result.push(nodes.get(ii).value);
      ii++;
    }
    return result;
  }

  get(index: number): any {
    if (index < 0 || index > this._routeNodes.size - 1) {
      return null;
    }
    return this._routeNodes.get(index).value;
  }

  /**
   * Returns the key associated with the route.
   * When a route is added to a state, the state creates a key for this route.
   * The key will persist until the initial state and its derived state
   * no longer contains this route.
   */
  keyOf(route: any): ?string {
    if (isRouteEmpty(route)) {
      return null;
    }
    var index = this.indexOf(route);
    return index > -1 ?
      this._routeNodes.get(index).key :
      null;
  }

  find(
    predicate: (value?: any, key?: number) => boolean,
    context?: any,
  ): any {
    const result = this._routeNodes.find(
      (routeNode) => predicate(routeNode.value),
      context
    );
    return result ? result.value : result;
  }

  indexOf(route: any): number {
    if (isRouteEmpty(route)) {
      return -1;
    }

    var finder = (node) => {
      return (node: RouteNode).value === route;
    };

    return this._routeNodes.findIndex(finder, this);
  }

  slice(begin: ?number, end: ?number): NavigationState {
    var routeNodes = this._routeNodes.slice(begin, end);
    var index = Math.min(this._index, routeNodes.size - 1);
    return this._update(routeNodes, index);
  }

  /**
   * Returns a new state with the provided route appended,
   * and moves the index to the newly appended route.
   */
  push(route: any): NavigationState {

    invariant(
      !isRouteEmpty(route),
      'Must supply route to push'
    );

    invariant(this._routeNodes.indexOf(route) === -1, 'route must be unique');

    // When pushing, removes the rest of the routes past the current index.
    var routeNodes = this._routeNodes.withMutations((list: List) => {
      list.slice(0, this._index + 1).push(new RouteNode(route));
    });

    return this._update(routeNodes, routeNodes.size - 1);
  }

  /**
   * Returns a new state with the last route removed, and the index set to the new last route
   */
  pop(): NavigationState {
    invariant(this._routeNodes.size > 1, 'can not pop a NavigationState with only one route');

    // When popping, removes the rest of the routes past the current index.
    var routeNodes = this._routeNodes.slice(0, this._index);
    return this._update(routeNodes, routeNodes.size - 1);
  }

  jumpToIndex(index: number): NavigationState {
    invariant(
      index > -1 && index < this._routeNodes.size,
      'index out of bound'
    );

    return this._update(this._routeNodes, index);
  }

  /**
   * Replace a route in the navigation state.
   *
   * `index` specifies the route in the state that should be replaced.
   * If it's negative, it counts from the back.
   */
  replaceAtIndex(index: number, route: any): NavigationState {
    invariant(
      !isRouteEmpty(route),
      'Must supply route to replace'
    );

    if (this.get(index) === route) {
      return this;
    }

    invariant(this.indexOf(route) === -1, 'route must be unique');

    if (index < 0) {
      index += this._routeNodes.size;
    }

    invariant(
      index > -1 && index < this._routeNodes.size,
      'index out of bound'
    );

    var routeNodes = this._routeNodes.set(index, new RouteNode(route));
    return this._update(routeNodes, this._index);
  }

  // Iterations
  forEach(callback: IterationCallback, context: ?Object): void {
    var ii = 0;
    var nodes = this._routeNodes;
    while (ii < nodes.size) {
      var node = nodes.get(ii);
      callback.call(context, node.value, ii, node.key);
      ii++;
    }
  }

  mapToArray(callback: IterationCallback, context: ?Object): Array<any> {
    var result = [];
    this.forEach((route, index, key) => {
      result.push(callback.call(context, route, index, key));
    });
    return result;
  }

  /**
   * Returns a Set excluding any routes contained within the state given.
   */
  subtract(state: NavigationState): Set<StackDiffRecord> {
    var items = [];
    this._routeNodes.forEach((node: RouteNode, index: number) => {
      if (!state._routeNodes.contains(node)) {
        items.push(
          new StackDiffRecord({
            route: node.value,
            index: index,
            key: node.key,
          })
        );
      }
    });
    return new Set(items);
  }

  _update(routeNodes: List, index: number): NavigationState {
    if (this._index === index && this._routeNodes === routeNodes) {
      return this;
    }
    return new NavigationState(routeNodes, index);
  }
}

module.exports = NavigationState;
