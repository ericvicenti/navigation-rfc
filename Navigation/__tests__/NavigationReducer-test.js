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
    let state = NavigationReducer(
      {
        routes: ['a'],
        index: 0,
      },
      NavigationActions.Push('b')
    );
    expect(state.routes[0]).toBe('a');
    expect(state.routes[1]).toBe('b');
    expect(state.routes.length).toBe(2);
    expect(state.index).toBe(1);
  });

  it('handles Pop', () => {
    let state = NavigationReducer(
      {
        routes: ['a', 'b'],
        index: 1,
      },
      NavigationActions.Pop()
    );
    expect(state.routes[0]).toBe('a');
    expect(state.routes.length).toBe(1);
    expect(state.index).toBe(0);

    // make sure Pop on an single-route state is a no-op
    state = NavigationReducer(
      state,
      NavigationActions.Pop(),
    );

    expect(state.routes.length).toBe(1);
    expect(state.index).toBe(0);
  });

  it('handles JumpTo', () => {
    let state = NavigationReducer(
      {
        routes: ['a', 'b', 'c'],
        index: 0,
      },
      NavigationActions.JumpTo('b')
    );

    expect(state.routes.length).toBe(3);
    expect(state.index).toBe(1);

    state = NavigationReducer(
      state,
      NavigationActions.JumpTo('c')
    );

    expect(state.routes.length).toBe(3);
    expect(state.index).toBe(2);
  });

  it('handles Reset', () => {
    let state = NavigationReducer(
      {
        routes: ['a', 'b'],
        index: 0,
      },
      NavigationActions.Reset(['c', 'd'], 1)
    );

    expect(state.routes[0]).toBe('c');
    expect(state.routes[1]).toBe('d');
    expect(state.routes.length).toBe(2);
    expect(state.index).toBe(1);
  });


  it('handles OnRouteKey Push', () => {
    let state = {
      routes: [
        {
          key: 'subState0',
          routes: ['a'],
          index: 0,
        },
        {
          key: 'subState1',
          routes: ['b'],
          index: 0,
        },
      ],
      index: 1,
    };

    state = NavigationReducer(
      state,
      NavigationActions.OnRouteKey('subState0', NavigationActions.Push('c'))
    );

    expect(state.routes[0].routes[0]).toBe('a');
    expect(state.routes[0].routes[1]).toBe('c');
    expect(state.routes[0].routes.length).toBe(2);
    expect(state.routes[0].index).toBe(1);
    expect(state.routes[1].routes[0]).toBe('b');
    expect(state.routes[1].routes.length).toBe(1);
    expect(state.routes[1].index).toBe(0);
    expect(state.routes.length).toBe(2);
    expect(state.index).toBe(1);
  });
});
