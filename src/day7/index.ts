import fs from 'fs';

const INPUT_FILE_PATH = 'src/day7/input.txt';

const inputText = fs.readFileSync(INPUT_FILE_PATH).toString('utf-8');
const initialPositions = inputText.split(',').map(Number);

const positionToCountMap = initialPositions.reduce<{ [position: number]: number }>((agg, position) => {
    agg[position] = (agg[position] || 0) + 1;
    return agg;
}, {});

const minPosition = Object
    .keys(positionToCountMap)
    .reduce((smallestSoFar, current) => Math.min(parseInt(current), smallestSoFar), initialPositions[0]);

const maxPosition = Object
    .keys(positionToCountMap)
    .reduce((biggestSoFar, current) => Math.max(parseInt(current), biggestSoFar), initialPositions[0]);

// https://adventofcode.com/2021/day/7
function runPartOne(): number {
    let smallestFuelAmount = Infinity;
    for (let targetPosition = minPosition; targetPosition < maxPosition + 1; targetPosition++) {
        const fuelAmount = Object
            .entries(positionToCountMap)
            .reduce((fuelAmountSoFar, [currentPosition, numAtPosition]) => {
                const difference = Math.abs(parseInt(currentPosition) - targetPosition);
                return fuelAmountSoFar + (difference * numAtPosition);
            }, 0);
        smallestFuelAmount = Math.min(fuelAmount, smallestFuelAmount);
    }
    return smallestFuelAmount
}

const partOneOutput = runPartOne();
console.log(`PART ONE: ${partOneOutput}`); // 326132

// https://adventofcode.com/2021/day/7#part2
function runPartTwo(): number {
    let smallestFuelAmount = Infinity;
    for (let targetPosition = minPosition; targetPosition < maxPosition + 1; targetPosition++) {
        const fuelAmount = Object
            .entries(positionToCountMap)
            .reduce((fuelAmountSoFar, [currentPosition, numAtPosition]) => {
                const difference = Math.abs(parseInt(currentPosition) - targetPosition);
                let fuelNeeded = 0;
                for (let i = 0; i < difference; i++) {
                    fuelNeeded += i + 1;
                }
                return fuelAmountSoFar + (fuelNeeded * numAtPosition);
            }, 0);
        smallestFuelAmount = Math.min(fuelAmount, smallestFuelAmount);
    }
    return smallestFuelAmount;
}

const partTwoOutput = runPartTwo();
console.log(`PART TWO: ${partTwoOutput}`); // 88612508