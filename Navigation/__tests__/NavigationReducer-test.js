/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow-broken
 */
'use strict';

jest
 .autoMockOff()
 .mock('ErrorUtils');

var NavigationAction = require('NavigationAction');
var NavigationReducer = require('NavigationReducer');
var NavigationStack = require('NavigationStack');

describe('NavigationReducer', () => {

  it('handles NavigationAction.Push', () => {
    let stack = new NavigationStack(['a'], 0);
    let action = new NavigationAction.Push('b');
    stack = NavigationReducer(stack, action);

    expect(stack.get(0)).toBe('a');
    expect(stack.get(1)).toBe('b');
    expect(stack.size).toBe(2);
    expect(stack.index).toBe(1);
  });

  it('handles NavigationAction.Pop', () => {
    let stack = new NavigationStack(['a', 'b'], 1);
    let action = new NavigationAction.Pop();
    stack = NavigationReducer(stack, action);

    expect(stack.get(0)).toBe('a');
    expect(stack.size).toBe(1);
    expect(stack.index).toBe(0);

    action = new NavigationAction.Pop();
    stack = NavigationReducer(stack, action);

    expect(stack.size).toBe(1);
    expect(stack.index).toBe(0);
  });

  it('handles NavigationAction.JumpTo', () => {
    let stack = new NavigationStack(['a', 'b', 'c'], 0);
    let action = new NavigationAction.JumpTo('b');
    stack = NavigationReducer(stack, action);

    expect(stack.size).toBe(3);
    expect(stack.index).toBe(1);

    action = new NavigationAction.JumpTo('c');
    stack = NavigationReducer(stack, action);

    expect(stack.size).toBe(3);
    expect(stack.index).toBe(2);
  });

  it('handles NavigationAction.Reset', () => {
    let stack = new NavigationStack(['a', 'b'], 0);
    let action = new NavigationAction.Reset(new NavigationStack(['c', 'd'], 1));
    stack = NavigationReducer(stack, action);

    expect(stack.get(0)).toBe('c');
    expect(stack.get(1)).toBe('d');
    expect(stack.size).toBe(2);
    expect(stack.index).toBe(1);
  });


  it('handles NavigationAction.OnRouteNavigationStack Push', () => {
    function makeObjectRoute(navStack) {
      return {
        getNavigationStack: () => navStack,
        setNavigationStack: makeObjectRoute,
      };
    }
    // Routes can expose a sub-stack by implementing `get/setNavigationStack`
    let route1subStack = new NavigationStack(['a'], 0);
    let route1 = makeObjectRoute(route1subStack);

    // Or, navigation stacks can be directly used as child routes
    let route2 = new NavigationStack(['b'], 0);

    let stack = new NavigationStack([route1, route2], 1);

    // this action should perform a push action on the sub-navigation stack of route1
    let action = new NavigationAction.OnRouteNavigationStack(route1, new NavigationAction.Push('c'));
    stack = NavigationReducer(stack, action);

    expect(stack.get(0).getNavigationStack().get(0)).toBe('a');
    expect(stack.get(0).getNavigationStack().get(1)).toBe('c');
    expect(stack.get(0).getNavigationStack().size).toBe(2);
    expect(stack.get(0).getNavigationStack().index).toBe(1);
    expect(stack.get(1).get(0)).toBe('b');
    expect(stack.get(1).size).toBe(1);
    expect(stack.get(1).index).toBe(0);
    expect(stack.size).toBe(2);
    expect(stack.index).toBe(1);
  });
});
