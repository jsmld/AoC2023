import { readFileSync } from 'fs'

const gameValues = readFileSync('./game.txt', 'utf-8').split('\n')
let solution = 0
const maxVals = {
  'r': 12,
  'g': 13,
  'b': 14 
}
const regex = /\d+\s*([rgb])/g;
const gamesArr = gameValues.map((val) => (
  val.match(regex)
))

const thing = gamesArr.map(arr => (
  arr.map(el => {
    let [num, color] = el.split(' ')
    return Number(num) <= maxVals[color]
  })
))

const wat = []

thing.map(arr => (
  wat.push(arr.every(el => el === true))
))

wat.forEach((el, i) => el ? solution += i+1 : solution+= 0)

console.log(solution)


