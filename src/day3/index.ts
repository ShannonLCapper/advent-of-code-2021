import fs from 'fs';

type Bit = '0' | '1';

const INPUT_FILE_PATH = 'src/day3/input.txt';

const inputText = fs.readFileSync(INPUT_FILE_PATH).toString('utf-8');
const inputValues = inputText.split('\n');

function findMostCommonBit(values: string[], position: number): Bit {
    const { zeros: numZeros, ones: numOnes } = values.reduce(({ zeros, ones }, inputValue) => {
        const bit = inputValue[position];
        return {
            zeros: bit === '0' ? zeros + 1 : zeros,
            ones: bit === '1' ? ones + 1 : ones,
        };
    }, { zeros: 0, ones: 0 });
    // If equal, prefer 1
    return numZeros > numOnes ? '0' : '1';
}

function findLeastCommonBit(values: string[], position: number): Bit {
    const mostCommonBit = findMostCommonBit(values, position);
    return flipBit(mostCommonBit);
}

function flipBit(bit: Bit): Bit {
    return bit === '0' ? '1' : '0';
}

// https://adventofcode.com/2021/day/3
const numPositions = inputValues[0].length;
let gammaRate = '';
for (let position = 0; position < numPositions; position++) {
    gammaRate += findMostCommonBit(inputValues, position);
}

const epsilonRate = gammaRate
    .split('')
    .map((bit) => flipBit(bit as Bit))
    .join('');

const partOneOutput = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

console.log(`PART 1: ${partOneOutput}`);

// https://adventofcode.com/2021/day/3#part2
function filterToOneValue(
    values: string[],
    getBitToKeep: (values: string[], position: number) => Bit,
): string {
    let possibleValues = values;
    for (let position = 0; position < values[0].length; position++) {
        const bitToKeep = getBitToKeep(possibleValues, position);
        possibleValues = possibleValues.filter(
            (value) => value[position] === bitToKeep,
        )
        if (possibleValues.length < 2) {
            break;
        }
    }
    return possibleValues[0];
}

const oxygenGeneratorRating = filterToOneValue(inputValues, findMostCommonBit);
const co2ScrubberRating = filterToOneValue(inputValues, findLeastCommonBit);
const partTwoOutput = parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);

console.log(`PART 2: ${partTwoOutput}`);