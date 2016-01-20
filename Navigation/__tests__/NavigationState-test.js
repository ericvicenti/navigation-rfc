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

var NavigationState = require('NavigationState');

var VALID_PARENT_STATES = [
  {routes: ['a','b'], index: 0},
  {routes: [{key: 'a'},{key: 'b'}], index: 0},
];
var INVALID_PARENT_STATES = [
  'foo',
  {},
  12,
  null,
  undefined,
  [],
];

describe('NavigationState', () => {

  it('identifies parents correctly with isParent', () => {
    for (var i = 0; i <= VALID_PARENT_STATES.length; i++) {
      var navState = VALID_PARENT_STATES[0];
      expect(NavigationState.isParent(navState)).toBe(true);
    }
    for (var i = 0; i <= INVALID_PARENT_STATES.length; i++) {
      var navState = INVALID_PARENT_STATES[0];
      expect(NavigationState.isParent(navState)).toBe(false);
    }
  });

  it('can get routes based on string equality or key', () => {
    var barRoute = {key: 'bar'};
    var navState = {routes: ['foo', barRoute], index: 0};
    expect(NavigationState.get(navState, 'foo')).toBe('foo');
    expect(NavigationState.get(navState, 'bar')).toBe(barRoute);
    expect(NavigationState.get(navState, 'missing')).toBe(null);
  });
});
