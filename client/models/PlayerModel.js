

export default class PlayerModel {
  defaults() {
    return {

    }
  }

  // // Do we need this?
  // findParams() {
  //   return{
  //     query: {
  //       $sort: { createdAt: -1 },
  //       $limit: 10
  //     }
  //   }
  // }
  //
  // // Do we need this?
  // constructor(dispatch, onError) {
  //   super('game', dispatch, onError);
  // }
}

const playerModel = new PlayerModel()
