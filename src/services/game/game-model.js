'use strict';

// game-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const swordSchema = new Schema({
  active: { type: Boolean, required: true, 'default': true },
  image: { type: String, required: true },
  position: {
    x: { type: Number, required: true, 'default': 0 },
    y: { type: Number, required: true, 'default': 0 }
  },
  radius: { type: Number, required: true, 'default': 10 },
})

const levelSchema = new Schema({
  title: { type: String, required: false },
  speed: {type: Number, required: true, 'default': 1},
  amount: {type: Number, required: true, 'default': 25},
})

const playerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  isDead: { type: Boolean, required: true, 'default': false },
  isHit: { type: Boolean, required: true, 'default': false },
  puppet: { type: String, required: false },
  name: { type: String, required: true },
  points: {type: Number, required: true, 'default': 0},
  lifes: {type: Number, required: true, 'default': 5},
  position: {
    x: { type: Number, required: true, 'default': 600 },
    y: { type: Number, required: true, 'default': 550 }
  },
  radius: { type: Number, required: true, 'default': 50 },
});

const gameSchema = new Schema({
  playerOne: playerSchema,
  playerTwo: playerSchema,
  swords: [swordSchema],
  level: levelSchema,
  started: { type: Boolean, required: true, 'default': false },
  counter: { type: Number, required: true, 'default': 5},
  ended: { type: Boolean, required: true, 'default': false },
  winner: { type: Number, required: false},                      // == player = {}
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
});

const gameModel = mongoose.model('game', gameSchema);

module.exports = gameModel;
