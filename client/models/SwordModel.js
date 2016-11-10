

export default class SwordModel {
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
  // constructor(dispatch, onError) {
  //   super('game', dispatch, onError);
  // }
}

const swordModel = new SwordModel()
