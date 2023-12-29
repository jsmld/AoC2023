// we need to sum the part numbers
// we need to determine, in the full schematic, which are the part numbers
//
// schematic is a set of lines, line containing a unit:
// a unit can be:
// - a number
// - a period
// - a symbol (anything else)

// a part number is a consecutive set of numbers that are
// adjacent to a symbol

import { readFileSync } from "fs";

const exampleInput = [
"467..114..",
"...*......",
"..35..633.",
"......#...",
"617*......",
".....+.58.",
"..592.....",
"......755.",
"...$.*....",
".664.598..",
]

const exampleMatrix = exampleInput.map(s => s.split(""))

const input = readFileSync("./schematic.txt","utf-8")
      .trim()
      .split("\n")
      .map(s => s.split(""));

// checks if any cardinal points of character at index are a symbol,
// returns true if so, false if not.
const isSymbolAdjacent = (matrix, numIdx, lineIdx) => {
  const line = matrix[lineIdx]
  const lineAbove = (lineIdx === 0) ? [] : matrix[lineIdx - 1]
  const lineBelow = (lineIdx === matrix.length - 1) ?  [] : matrix[lineIdx + 1];

  const left = (arr,i) => i === 0 ? 0 : arr[i - 1];
  const right = (arr,i) => i === arr.length - 1 ? 0 : arr[i + 1];

  const pointsAbove = lineAbove.length > 0
        ? [left(lineAbove, numIdx), lineAbove[numIdx], right(lineAbove, numIdx)]
        : [];

  const pointsBelow = lineBelow.length > 0
        ? [left(lineBelow, numIdx), lineBelow[numIdx], right(lineBelow,numIdx)]
        : [];

  const adjacentPoints = [...pointsAbove, left(line,numIdx), right(line,numIdx), ...pointsBelow];

  return adjacentPoints.some(point => isNaN(point) && point != ".");
}

function sumPartsPerLine (arr, line, lineIndex) {
  let total = 0
  let num = ""
  let isPart = false

  const handleNumber = (ch, i) => {
    num = num + ch
    if (isSymbolAdjacent(arr, i, lineIndex)) {
      isPart = true
    }

    const next = line[i + 1]

    if (next >= line.length || isNaN(next)) {
      total += isPart ? Number(num) : 0
      num = ""
      isPart = false
    }
  }

  line.forEach((ch,i) => {
    if (isNaN(ch)) return
    else handleNumber(ch,i)
  })

  return total

}

const sum = (a,b) => a + b;

const exampleAnswer = 4361
const exampleSolution = exampleMatrix.map((line,idx) => sumPartsPerLine(exampleMatrix, line,idx)).reduce(sum)
console.log({exampleAnswer,exampleSolution})

const solution = input.map((line,idx) => sumPartsPerLine(input, line, idx)).reduce(sum)
console.log({solution})