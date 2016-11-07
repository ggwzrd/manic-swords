'use strict';

const assert = require('assert');
const winner = require('../../../../src/services/game/hooks/winner.js');

describe('game winner hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    winner()(mockHook);

    assert.ok(mockHook.winner);
  });
});
