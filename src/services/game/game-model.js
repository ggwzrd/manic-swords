'use strict';

// game-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const swordSchema = new Schema({
  active: { type: Boolean, required: true, 'default': true },
  position: {
    x: { type: Number, required: true, 'default': 0 },
    y: { type: Number, required: true, 'default': 0 }
  }
})

const levelSchema = new Schema({
  title: { type: String, required: false },
  current: { type: Boolean, required: true, 'default': false },
  speed: {type: Number, required: true, 'default': 1},
  amount: {type: Number, required: true, 'default': 5},
})

const playerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  isDead: { type: Boolean, required: true, 'default': false },
  isHit: { type: Boolean, required: true, 'default': false },
  color: { type: String, required: false },
  name: { type: String, required: true },
  points: {type: Number, required: true, 'default': 0},
  lifes: {type: Number, required: true, 'default': 5},
  position: {
    x: { type: Number, required: true, 'default': 450 },
    y: { type: Number, required: true, 'default': 300 }
  }
});

const gameSchema = new Schema({
  players: [playerSchema],
  swords: [swordSchema],
  levels: [levelSchema],
  started: { type: Boolean, required: true, 'default': false },
  ended: { type: Boolean, required: true, 'default': false },
  winner: { type: Number, required: false },                      // == player = {}
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'user' }
});

const gameModel = mongoose.model('game', gameSchema);

module.exports = gameModel;
