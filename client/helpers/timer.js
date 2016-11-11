export const setTimer = (_self, game) => {

    const { saveGame } = this.props

    const timerArray = ['5', '4', '3', '2', '1', '0']

    timerArray.map((item) => {

      if (timerArray.length === 0) {
        console.log('timer ready')
        saveGame(game, { started: true })
        return 'Go!'
      }
      return item
      console.log('NUMBER: ', item)
      let start = new Date().getTime()
      for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > 1000){
          break;
        }
     }
   })
 }
