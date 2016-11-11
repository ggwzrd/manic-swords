'use strict';

// src/services/game/hooks/check-game-status.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

const removeLife = (players) => {
  return players.map((player) => {
    if (player.isHit){
      player.isHit = false
      player.lifes--
      !!isDead(player) ? player.isDead = true : null
      return player   //destroy player if necessary
    }
    return player
  })
}

const isGameOver = (players) => {
  return players.reduce((prevPlayer, nextPlayer) => {
    return nextPlayer.isDead
  }, false)
}

const isDead = (player) => {
  return player.lifes - 1 <= 0 ? true : false
}


const levelCompleted = (swords) => {
  swords.reduce((completed, sword) => {
    return !sword.active
  }, false)
}

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const swords = hook.data.swords;
    const players = hook.data.players;
    const levels = hook.data.levels;

    let updatedPlayers = removeLife(players)
    hook.data.winner = players.indexOf(updatedPlayers.reduce((prevPlayer, nextPlayer) => {
      if(prevPlayer.isDead){
        return nextPlayer
      }else{
        return isDead(nextPlayer) ?
          prevPlayer : {}
      }
    }, {}))

    if(isGameOver(updatedPlayers)){
      hook.data.ended = true
    }
    //  else update level
  };
};
