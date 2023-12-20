import { readFileSync } from 'fs'

const gameValues = readFileSync('./game.txt', 'utf-8').split('\n')

const maxVals = {
  'r': 12,
  'g': 13,
  'b': 14
}
const regex = /\d+\s*([rgb])/g;
const gamesArr = gameValues.map((val) => (
  val.match(regex)
))

const gamePossible = gamesArr.map(game => (
  game.map(val => {
    let [num, color] = val.split(' ')
    return Number(num) <= maxVals[color]
  })))
  .map(game => game.every(val => val === true))
  .reduce((acc, curr, i) => (curr ? acc + i + 1 : acc))

console.log(gamePossible)

const gamePossibleV2 = gamesArr.map(game => {
  let highestVals = {
    'r': 0,
    'g': 0,
    'b': 0
  }
  game.forEach(val => {
    let [num, color] = val.split(' ')
    if (Number(num) > highestVals[color]) {
      highestVals[color] = Number(num)
    }
  })

  return highestVals['r'] * highestVals['g'] * highestVals['b']
}).reduce((a, b) => a + b)

console.log(gamePossibleV2)

