'use strict';

// src/services/game/hooks/check-game-status.js
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

const isDead = (player) => {
  return player.lifes <= 0 ? true : false
}

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
    return prevPlayer.idDead === true && nextPlayer.isDead === true ? true : false
  }, false)
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
    const players = [hook.data.playerOne, hook.data.playerTwo];
    const levels = hook.data.levels;

    let updatedPlayers = removeLife(players)
    // let winnerId = updatedPlayers.filter((player) => {
    //   if (!player.isDead){
    //     return player._id
    //   }
    // })
    // //
    // winnerId = winnerId.length > 1 ? null : winnerId[0]
    // hook.data.winner = updatedPlayers.map((player) => player._id).indexOf(winnerId)

    if(isGameOver(updatedPlayers)){
      hook.data.ended = true
    }
    // else{
    //   if(swords.length <= 0 && hook.data.started){
    //     hook.data.started = false
    //     hook.data.levels.shift()
    //     hook.data.levels[0].current = true
    //     hook.data.swords = randomize(hook.data.levels[0])
    //   }
    // }
  }
}
