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
    x: { type: Number, required: true, 'default': 100 },
    y: { type: Number, required: true, 'default': 100 }
  }
})

const playerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  color: { type: String, required: false },
  name: { type: String, required: true },
  points: {type: Number, required: true, 'default': 0},
  lifes: {type: Number, required: true, 'default': 5},
  position: {
    x: { type: Number, required: true, 'default': 100 },
    y: { type: Number, required: true, 'default': 100 }
  }
});

const gameSchema = new Schema({
  swords: [swordSchema],
  players: [playerSchema],
  started: { type: Boolean, required: true, 'default': false },
  level: { type: Number, required: true, 'default': 1 },
  winner: { type: Number, required: false },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'user' }
});

const gameModel = mongoose.model('game', gameSchema);

module.exports = gameModel;
