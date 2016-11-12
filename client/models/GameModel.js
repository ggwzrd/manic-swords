import BaseModel from 'feathersjs-redux-model/build/models/base-model'

class GameModel extends BaseModel {
  defaults() {
    return {
      playerOne: null,
      playerTwo: null,
      swords: [],
      levels: [],
      ended: false,
      started: false,
      counter: 5,
      winner: null,
      createdAt: Date.now,
      updatedAt: Date.now
    };
  }

  findParams() {
    return {
      query: {
        $sort: { createdAt: -1 },
        $limit: 10
      }
    };
  }

  constructor(dispatch, onError) {
    super('game', dispatch, onError);
  }
}

const gameModel = new GameModel()

export default gameModel
