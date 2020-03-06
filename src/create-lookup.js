const Combinatorics = require("js-combinatorics");
const fs = require('fs');

const whiteResults = [0, 0, 0, 1, 1, 2];
const redResults = [0, 1, 1, 1, 1, 2];

// You can likely do this in real time if you are good at the maths, but this works
function createProbArray(whiteDiceCount, redDiceCount) {
  const maxStrikesPossible = 2 * (whiteDiceCount + redDiceCount);
  const probArray = new Array(maxStrikesPossible + 1);
    probArray.fill(0);
  if (whiteDiceCount === 0 && redDiceCount === 0) {
    return probArray;
  }

  let defenseRolls = [];
  for (let i = 0; i < whiteDiceCount; i++) {
    defenseRolls.push(whiteResults);
  }
  for (let i = 0; i < redDiceCount; i++) {
    defenseRolls.push(redResults);
  }

  const defenseComb = Combinatorics.cartesianProduct.apply(null, defenseRolls);
  defenseComb.forEach((value) => {
    const valueTotal = value.reduce((a, b) => a + b, 0)
    probArray[valueTotal] += 1;
  });
  for (let i = 0; i <= maxStrikesPossible; i++) {
    probArray[i] = probArray[i] / (defenseComb.length);
  }
  return probArray;
}

const max_white = 7;
const max_red = 4;

let cache = new Array(max_white + 1);
for (let i = 0; i < cache.length; i++) {
  cache[i] = new Array(max_red + 1);
}
for (let whiteDice = 0; whiteDice <= max_white; whiteDice++) {
  console.log('On white dice', whiteDice);
  for (let redDice = 0; redDice <= max_red; redDice++) {
    console.log('On red dice', redDice);
    cache[whiteDice][redDice] = createProbArray(whiteDice, redDice);
  }
}

let result = 'const lookupArray = '
result += JSON.stringify(cache) + ';'
result += '\n\n\nmodule.exports = lookupArray;'
fs.writeFileSync('./src/lookup.js', result, 'utf-8');