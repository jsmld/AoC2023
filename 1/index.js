import { readFileSync } from 'fs'

const calibrationValues = readFileSync('./calibration.txt', 'utf-8').split('\n')

function numbersOnly (str) {
  return str.split('').filter(c => !isNaN(c)).join('')
}

function firstAndLast (str) {
  return str[0] + str[str.length - 1]
}

function sum (acc, cur) {
  return parseInt(acc) + Number(cur)
}

function calibrationSum (inputArr) {
  return inputArr.map(numbersOnly).map(firstAndLast).reduce(sum)
}

console.log({'Should be the answer: ': calibrationSum(calibrationValues)})