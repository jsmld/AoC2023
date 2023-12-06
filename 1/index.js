import { readFileSync } from 'fs'

const calibrationValues = readFileSync('./calibration.txt', 'utf-8').split('\n')

function firstAndLastDigits (input) {
  let matches = input.match(/\d/g)
  const firstLast = matches[0] + matches[matches.length - 1]
  return Number(firstLast)
}

function firstAndLastNumbers (input) {
  const regex = /(one|two|three|four|five|six|seven|eight|nine|\d)/g
  let matches = []
  let found
  while (found = regex.exec(input)) {
    matches.push(found[0])
    regex.lastIndex = found.index + 1 
  }
  const numberWords = ["zero","one","two","three","four", "five","six","seven","eight","nine"]
  const m = matches.map(str => Number(str) ? str : numberWords.indexOf(str).toString())
  const firstLast = m[0] + m[m.length - 1]
  return Number(firstLast)
}

function calibrationSumPartOne (inputArr) {
  return inputArr.map(firstAndLastDigits).reduce((a,c) => a + c)
}

function calibrationSumPartTwo (inputArr) {
  return inputArr.map(firstAndLastNumbers).reduce((a,c) => a + c)
}

console.log({'Should be the answer for part one: ': calibrationSumPartOne(calibrationValues)})
console.log({'Should be the answer for part two: ': calibrationSumPartTwo(calibrationValues)})