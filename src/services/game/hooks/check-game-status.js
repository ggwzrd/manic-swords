'use strict';

// src/services/game/hooks/check-game-status.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const swords = hook.data.swords;
    const players = hook.data.players;
    const levels = hook.data.levels;

    // check if player is hitted by sword
    //...

    //check amount of lifes of players
    //...
      //destroy player if necessary
      //...

    // Game over if all player killed

    //check level status by active swords
    //...

    //update level if there aren't swords
    //...
  };
};
