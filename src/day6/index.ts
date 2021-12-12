import fs from 'fs';

interface State {
    [age: number]: number;
};

const INPUT_FILE_PATH = 'src/day6/input.txt';

const inputText = fs.readFileSync(INPUT_FILE_PATH).toString('utf-8');
const initialState: State = inputText
    .split(',')
    .map(Number)
    .reduce<State>((agg, fish) => {
        agg[fish] = (agg[fish] || 0) + 1;
        return agg;
    }, {});

function getNextState(state: State): State {
    return Object
        .entries(state)
        .reduce<State>((nextState, [fishAgeStr, numFishAtThisAge]) => {
            const fishAge = parseInt(fishAgeStr);
            if (fishAge === 0) {
                const newAge = 6;
                nextState[newAge] = (nextState[newAge] || 0) + numFishAtThisAge;
                nextState[8] = (nextState[8] || 0) + numFishAtThisAge;
            }
            else {
                const newAge = fishAge - 1;
                nextState[newAge] = (nextState[newAge] || 0) + numFishAtThisAge;
            }
            return nextState;
        }, {});
}

function countFish(state: State): number {
    return Object
        .values(state)
        .reduce((total, numFishAtThisAge) => total + numFishAtThisAge, 0);
}

function simulateNDays(initialState: State, numDays: number): State {
    let state = initialState;
    for (let day = 0; day < numDays; day++) {
        state = getNextState(state);
    }
    return state;
}

// https://adventofcode.com/2021/day/6
function runPartOne(): number {
    const state = simulateNDays(initialState, 80);
    return countFish(state);
}

const partOneOutput = runPartOne();
console.log(`PART ONE: ${partOneOutput}`); // 351188

// https://adventofcode.com/2021/day/6#part2
function runPartTwo(): number {
    const state = simulateNDays(initialState, 256);
    return countFish(state);
}

const partTwoOutput = runPartTwo();
console.log(`PART TWO: ${partTwoOutput}`); // 1595779846729