import fs from 'fs';

const INPUT_FILE_PATH = 'src/day1/input.txt';

function sumArray(arr: number[]): number {
    return arr.reduce((agg, num) => num + agg, 0);
}

const inputText = fs.readFileSync(INPUT_FILE_PATH).toString('utf-8');
const inputValues = inputText.split('\n').map((value) => parseInt(value));

const partOneOutput = inputValues.reduce<number>((agg, currentValue, i, allValues) => {
    if (i === 0) {
        return agg;
    }
    const prevValue = allValues[i - 1];
    return currentValue > prevValue ? agg + 1 : agg;
}, 0);

console.log(`PART 1: ${partOneOutput}`);

const WINDOW_SIZE = 3;
const partTwoOutput = inputValues.reduce<number>((agg, _, windowStartIndex, allValues) => {
    const windowEndIndex = windowStartIndex + WINDOW_SIZE;
    
    if (windowStartIndex === 0 || windowEndIndex > allValues.length) {
        return agg;
    }
    
    const currentWindow = allValues.slice(windowStartIndex, windowEndIndex);
    const currentValue = sumArray(currentWindow);

    const prevWindow = allValues.slice(windowStartIndex - 1, windowEndIndex - 1);
    const prevValue = sumArray(prevWindow);

    return currentValue > prevValue ? agg + 1 : agg;
}, 0);

console.log(`PART 2: ${partTwoOutput}`);