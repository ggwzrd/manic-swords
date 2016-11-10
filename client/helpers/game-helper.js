
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
