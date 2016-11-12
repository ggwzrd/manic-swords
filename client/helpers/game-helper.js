
/**
 * Random Number between 2 numbers
 */
export const randomNumBetween = (min, max) => {
  return Math.round(Math.random() * (max - min + 1) + min)
}

/**
 * Random Number between 2 numbers excluding a certain range
 */
export const randomNumBetweenExcluding = (min, max, exMin, exMax) => {
  let random = randomNumBetween(min, max)
  while (random > exMin && random < exMax) {
    random = Math.random() * (max - min + 1) + min
  }
  return random
}

export const cleanDisabledSword = (_self, game, swords) => {
  _self.props.saveGame(game, {swords: swords.filter((s) => s.isActive() ? s : null)})
}

// export const isLevelCompleted = (swords) => {
//   return swords.filter((s) => s.isActive()).length === 0
// }


export const checkCollision = (swords, player) => {
  let result = { swords:[], player: {}}
  result.swords = swords.map((sword) => {
    let svx = sword.position.x + sword.radius
    let svy = sword.position.y + (sword.radius * 2)
    let pvx = player.position.x + (player.radius * 2)
    let pvy = player.position.y + (player.radius * 2)
    // console.log(length, player.radius + sword.radius)
    if(svx >= player.position.x && svx <= pvx && svy >= player.position.y && svy <= pvy && sword){
      player.isHit = true
      Object.assign(result, { player: player })
      sword.position.y = randomNumBetween(-50, -(50 * swords.length))
      return sword
    }
    return sword
  })
  return result
}
