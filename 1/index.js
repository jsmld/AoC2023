import fs, { readFileSync } from 'fs'

const calVals = readFileSync('./calibration.txt', 'utf-8').split('\n')

console.log(calVals)