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

function assetStringNotEmpty(str) {
  expect(!!str && typeof str === 'string').toBe(true);
}

describe('NavigationState:', () => {
  // Different types of routes.
  var ROUTES = [
    'foo',
    1,
    true,
    {foo: 'bar'},
    ['foo'],
  ];

  // Basic
  it('gets index', () => {
    var state = new NavigationState(['a', 'b', 'c'], 1);
    expect(state.index).toBe(1);
  });

  it('gets size', () => {
    var state = new NavigationState(['a', 'b', 'c'], 1);
    expect(state.size).toBe(3);
  });

  it('gets route', () => {
    var state = new NavigationState(['a', 'b', 'c'], 0);
    expect(state.get(2)).toBe('c');
  });

  it('converts to an array', () => {
    var state = new NavigationState(['a', 'b'], 0);
    expect(state.toArray()).toEqual(['a', 'b']);
  });

  it('creates a new state after mutation', () => {
    var state1 = new NavigationState(['a', 'b'], 0);
    var state2 = state1.push('c');
    expect(state1).not.toBe(state2);
  });

  it('throws at index out of bound', () => {
    expect(() => {
      new NavigationState(['a', 'b'], -1);
    }).toThrow();

    expect(() => {
      new NavigationState(['a', 'b'], 100);
    }).toThrow();
  });

  it('finds index', () => {
    var state = new NavigationState(['a', 'b'], 0);
    expect(state.indexOf('b')).toBe(1);
    expect(state.indexOf('c')).toBe(-1);
  });

  // Key
  it('gets key for route', () => {
    var test = (route) => {
      var state = new NavigationState(['a'], 0);
      var key = state.push(route).keyOf(route);
      expect(typeof key).toBe('string');
      expect(!!key).toBe(true);
    };

    ROUTES.forEach(test);
  });

  it('gets a key of larger value for route', () => {
    var lastKey = '';
    var test = (route) => {
      var state = new NavigationState(['a'], 0);
      var key = state.push(route).keyOf(route);
      expect(key > lastKey).toBe(true);
      lastKey = key;
    };

    ROUTES.forEach(test);
  });

  it('gets an unique key for a different route', () => {
    var state = new NavigationState(['a'], 0);
    var keys = {};

    var test = (route) => {
      state = state.push(route);
      var key = state.keyOf(route);
      expect(keys[key]).toBe(undefined);
      keys[key] = true;
    };

    ROUTES.forEach(test);
  });

  it('gets the same unique key for the same route', () => {
    var test = (route) => {
      var state = new NavigationState([route], 0);
      expect(state.keyOf(route)).toBe(state.keyOf(route));
    };

    ROUTES.forEach(test);
  });


  it('gets the same unique key form the derived state', () => {
    var test = (route) => {
      var state = new NavigationState([route], 0);
      var derivedStack = state.push('wow').pop().slice(0, 10).push('blah');
      expect(derivedStack.keyOf(route)).toBe(state.keyOf(route));
    };

    ROUTES.forEach(test);
  });

  it('gets a different key from a different state', () => {
    var test = (route) => {
      var state1 = new NavigationState([route], 0);
      var state2 = new NavigationState([route], 0);
      expect(state1.keyOf(route)).not.toBe(state2.keyOf(route));
    };

    ROUTES.forEach(test);
  });

  it('gets no key for a route that does not contains this route', () => {
     var state = new NavigationState(['a'], 0);
     expect(state.keyOf('b')).toBe(null);
  });

  it('gets a new key for a route that was removed and added again', () => {
    var test = (route) => {
      var state = new NavigationState(['a'], 0);

      var key1 = state.push(route).keyOf(route);
      var key2 = state.push(route).pop().push(route).keyOf(route);
      expect(key1).not.toBe(key2);
    };

    ROUTES.forEach(test);
  });

  // Slice
  it('slices', () => {
    var state1 = new NavigationState(['a', 'b', 'c', 'd'], 1);
    var state2 = state1.slice(1, 3);
    expect(state2).not.toBe(state1);
    expect(state2.toArray()).toEqual(['b', 'c']);
  });

  it('may update index after slicing', () => {
    var state = new NavigationState(['a', 'b', 'c'], 2);
    expect(state.slice().index).toBe(2);
    expect(state.slice(0, 1).index).toBe(0);
    expect(state.slice(0, 2).index).toBe(1);
    expect(state.slice(0, 3).index).toBe(2);
    expect(state.slice(0, 100).index).toBe(2);
    expect(state.slice(-2).index).toBe(1);
  });

  it('slices without specifying params', () => {
    var state1 = new NavigationState(['a', 'b', 'c'], 1);
    var state2 = state1.slice();
    expect(state2).toBe(state1);
  });

  it('slices to from the end', () => {
    var state1 = new NavigationState(['a', 'b', 'c', 'd'], 1);
    var state2 = state1.slice(-2);
    expect(state2.toArray()).toEqual(['c', 'd']);
  });

  it('throws when slicing to empty', () => {
      expect(() => {
        var state = new NavigationState(['a', 'b'], 1);
        state.slice(100);
      }).toThrow();
  });

  // Push
  it('pushes route', () => {
    var state1 = new NavigationState(['a', 'b'], 1);
    var state2 = state1.push('c');

    expect(state2).not.toBe(state1);
    expect(state2.toArray()).toEqual(['a', 'b', 'c']);
    expect(state2.index).toBe(2);
    expect(state2.size).toBe(3);
  });

  it('throws when pushing empty route', () => {
    expect(() => {
      var state = new NavigationState(['a', 'b'], 1);
      state.push(null);
    }).toThrow();

    expect(() => {
      var state = new NavigationState(['a', 'b'], 1);
      state.push('');
    }).toThrow();

    expect(() => {
      var state = new NavigationState(['a', 'b'], 1);
      state.push(undefined);
    }).toThrow();
  });

  it('replaces routes on push', () => {
    var state1 = new NavigationState(['a', 'b', 'c'], 1);
    var state2 = state1.push('d');
    expect(state2).not.toBe(state1);
    expect(state2.toArray()).toEqual(['a', 'b', 'd']);
    expect(state2.index).toBe(2);
  });

  // Pop
  it('pops route', () => {
    var state1 = new NavigationState(['a', 'b', 'c'], 2);
    var state2 = state1.pop();
    expect(state2).not.toBe(state1);
    expect(state2.toArray()).toEqual(['a', 'b']);
    expect(state2.index).toBe(1);
    expect(state2.size).toBe(2);
  });

  it('replaces routes on pop', () => {
    var state1 = new NavigationState(['a', 'b', 'c'], 1);
    var state2 = state1.pop();
    expect(state2).not.toBe(state1);
    expect(state2.toArray()).toEqual(['a']);
    expect(state2.index).toBe(0);
  });

  it('throws when popping to empty state', () => {
    expect(() => {
      var state = new NavigationState(['a'], 0);
      state.pop();
    }).toThrow();
  });

  // Jump
  it('jumps to index', () => {
    var state1 = new NavigationState(['a', 'b', 'c'], 0);
    var state2 = state1.jumpToIndex(2);

    expect(state2).not.toBe(state1);
    expect(state2.index).toBe(2);
  });

  it('throws then jumping to index out of bound', () => {
    expect(() => {
      var state = new NavigationState(['a', 'b'], 1);
      state.jumpToIndex(2);
    }).toThrow();

    expect(() => {
      var state = new NavigationState(['a', 'b'], 1);
      state.jumpToIndex(-1);
    }).toThrow();
  });

  // Replace
  it('replaces route at index', () => {
    var state1 = new NavigationState(['a', 'b'], 1);
    var state2 = state1.replaceAtIndex(0, 'x');

    expect(state2).not.toBe(state1);
    expect(state2.toArray()).toEqual(['x', 'b']);
    expect(state2.index).toBe(1);
  });

  it('replaces route at negative index', () => {
    var state1 = new NavigationState(['a', 'b'], 1);
    var state2 = state1.replaceAtIndex(-1, 'x');

    expect(state2).not.toBe(state1);
    expect(state2.toArray()).toEqual(['a', 'x']);
    expect(state2.index).toBe(1);
  });

  it('throws when replacing empty route', () => {
    expect(() => {
      var state = new NavigationState(['a', 'b'], 1);
      state.replaceAtIndex(1, null);
    }).toThrow();
  });

  it('throws when replacing at index out of bound', () => {
    expect(() => {
      var state = new NavigationState(['a', 'b'], 1);
      state.replaceAtIndex(100, 'x');
    }).toThrow();
  });

  // Iteration
  it('iterates each item', () => {
    var state = new NavigationState(['a', 'b'], 0);
    var logs = [];
    var keys = {};
    var context = {name: 'yo'};

    state.forEach(function (route, index, key) {
      assetStringNotEmpty(key);
      if (!keys.hasOwnProperty(key)) {
        keys[key] = true;
        logs.push([
          route,
          index,
          this.name,
        ]);
      }
    }, context);

    expect(logs).toEqual([
      ['a', 0, 'yo'],
      ['b', 1, 'yo'],
    ]);
  });

  it('Maps to an array', () => {
    var state = new NavigationState(['a', 'b'], 0);
    var keys = {};
    var context = {name: 'yo'};

    var logs = state.mapToArray(function(route, index, key) {
      assetStringNotEmpty(key);
      if (!keys.hasOwnProperty(key)) {
        keys[key] = true;
        return [
          route,
          index,
          this.name,
        ];
      }
    }, context);

    expect(logs).toEqual([
      ['a', 0, 'yo'],
      ['b', 1, 'yo'],
    ]);
  });

  // Diff
  it('subtracts state', () => {
    var state1 = new NavigationState(['a', 'b', 'c'], 2);
    var state2 = state1.pop().pop().push('x').push('y');

    var diff = state1.subtract(state2);

    var result = diff.toJS().map((record) => {
      assetStringNotEmpty(record.key);
      return {
        index: record.index,
        route: record.route,
      };
    });

    // route `b` and `c` are no longer in the state.
    expect(result).toEqual([
      {
        index: 1,
        route: 'b',
      },
      {
        index: 2,
        route: 'c',
      },
    ]);
  });

  it('only subtracts the derived state', () => {
    var state1 = new NavigationState(['a', 'b', 'c'], 2);
    var state2 = new NavigationState(['a'], 0);
    var diff = state1.subtract(state2);

    var result = diff.toJS().map((record) => {
      assetStringNotEmpty(record.key);
      return {
        index: record.index,
        route: record.route,
      };
    });

    expect(result).toEqual([
      {
        index: 0,
        route: 'a',
      },
      {
        index: 1,
        route: 'b',
      },
      {
        index: 2,
        route: 'c',
      },
    ]);

  });

  // find
  it('finds a route', () => {
    var state = new NavigationState(['a', 'b', 'c'], 2);
    var route = state.find(r => r === 'c');
    expect(route).toEqual('c');
  });
});
