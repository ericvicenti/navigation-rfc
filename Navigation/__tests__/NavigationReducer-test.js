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

var NavigationActions = require('NavigationActions');
var NavigationReducer = require('NavigationReducer');
var NavigationState = require('NavigationState');

describe('NavigationReducer', () => {

  it('handles Push', () => {
    let state = new NavigationState(['a'], 0);
    let action = new NavigationActions.Push('b');
    state = NavigationReducer(state, action);

    expect(state.get(0)).toBe('a');
    expect(state.get(1)).toBe('b');
    expect(state.size).toBe(2);
    expect(state.index).toBe(1);
  });

  it('handles Pop', () => {
    let state = new NavigationState(['a', 'b'], 1);
    let action = new NavigationActions.Pop();
    state = NavigationReducer(state, action);

    expect(state.get(0)).toBe('a');
    expect(state.size).toBe(1);
    expect(state.index).toBe(0);

    action = new NavigationActions.Pop();
    state = NavigationReducer(state, action);

    expect(state.size).toBe(1);
    expect(state.index).toBe(0);
  });

  it('handles JumpTo', () => {
    let state = new NavigationState(['a', 'b', 'c'], 0);
    let action = new NavigationActions.JumpTo('b');
    state = NavigationReducer(state, action);

    expect(state.size).toBe(3);
    expect(state.index).toBe(1);

    action = new NavigationActions.JumpTo('c');
    state = NavigationReducer(state, action);

    expect(state.size).toBe(3);
    expect(state.index).toBe(2);
  });

  it('handles Reset', () => {
    let state = new NavigationState(['a', 'b'], 0);
    let action = new NavigationActions.Reset(new NavigationState(['c', 'd'], 1));
    state = NavigationReducer(state, action);

    expect(state.get(0)).toBe('c');
    expect(state.get(1)).toBe('d');
    expect(state.size).toBe(2);
    expect(state.index).toBe(1);
  });


  it('handles OnRouteNavigationState Push', () => {
    function makeObjectRoute(navState) {
      return {
        getNavigationState: () => navState,
        setNavigationState: makeObjectRoute,
      };
    }
    // Routes can expose a sub-state by implementing `get/setNavigationState`
    let route1subStack = new NavigationState(['a'], 0);
    let route1 = makeObjectRoute(route1subStack);

    // Or, navigation states can be directly used as child routes
    let route2 = new NavigationState(['b'], 0);

    let state = new NavigationState([route1, route2], 1);

    // this action should perform a push action on the sub-navigation state of route1
    let action = new NavigationActions.OnRouteNavigationState(route1, new NavigationActions.Push('c'));
    state = NavigationReducer(state, action);

    expect(state.get(0).getNavigationState().get(0)).toBe('a');
    expect(state.get(0).getNavigationState().get(1)).toBe('c');
    expect(state.get(0).getNavigationState().size).toBe(2);
    expect(state.get(0).getNavigationState().index).toBe(1);
    expect(state.get(1).get(0)).toBe('b');
    expect(state.get(1).size).toBe(1);
    expect(state.get(1).index).toBe(0);
    expect(state.size).toBe(2);
    expect(state.index).toBe(1);
  });
});
