'use strict';

const assert = require('assert');
const checkGameStatus = require('../../../../src/services/game/hooks/check-game-status.js');

describe('game checkGameStatus hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    checkGameStatus()(mockHook);

    assert.ok(mockHook.checkGameStatus);
  });
});
