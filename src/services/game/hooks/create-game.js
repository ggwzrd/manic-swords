'use strict';


// src/services/game/hooks/create-game.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

function randomNumBetween(min, max) {
  return Math.round((Math.random() * (max - min + 1) + min))
}

function randomize(level) {
  const swords = []
  const step = 800 / level.amount
  let i = 0
  // randomize the position of the swords
  for(i = 0; i < level.amount; i++ ){
    swords.push({
      active: true,
      image: 'http://i.imgur.com/U4dKMGW.png',
      position: {
        x: randomNumBetween(40 + (step * i), step * i),
        y: randomNumBetween(-50, -(50 * level.amount))
      }
    })
  }
  return swords
}

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const user = hook.params.user;

    // Assign the logged in user as the creator of the game
    hook.data.userId = user._id;

    const currentLevel = {
      title: 'Winter is coming',
      current: true,
      speed: 5,
      amount: 100
    }

    const swords = randomize(currentLevel)

    // Add the randomized swords to the game

    hook.data.swords = swords

    // Add the all the levels to the game
    hook.data.levels = [currentLevel]
    // Add the logged in user as the first player
    hook.data.players = [{
      userId: user._id,
      name: user.name,
      puppet: 'http://i.imgur.com/GIhH6JQ.png',
      position:{
        x: randomNumBetween(100, 800),
        y: 450
      }
    }];

  };
};
