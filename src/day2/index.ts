import fs from 'fs';

const INPUT_FILE_PATH = 'src/day2/input.txt';

const inputText = fs.readFileSync(INPUT_FILE_PATH).toString('utf-8');
const inputValues = inputText.split('\n');

const partOnePosition = inputValues.reduce(({ depth, horizontal }, inputValue) => {
    const [command, amountStr] = inputValue.split(' ');
    const amount = parseInt(amountStr);
    switch (command) {
        case 'forward':
            return { depth, horizontal: horizontal + amount };
        case 'down':
            return { depth: depth + amount, horizontal };
        case 'up':
            return { depth: depth - amount, horizontal };
        default:
            return { depth, horizontal }
    }
}, { depth: 0, horizontal: 0 });

const partOneOutput = partOnePosition.depth * partOnePosition.horizontal;

console.log(`PART 1: ${partOneOutput}`);

const partTwoPosition = inputValues.reduce(({ depth, horizontal, aim }, inputValue) => {
    const [command, amountStr] = inputValue.split(' ');
    const amount = parseInt(amountStr);
    switch (command) {
        case 'forward':
            return {
                depth: depth + (aim * amount),
                horizontal: horizontal + amount,
                aim,
            };
        case 'down':
            return { depth, horizontal, aim: aim + amount};
        case 'up':
            return { depth, horizontal, aim: aim - amount };
        default:
            return { depth, horizontal, aim }
    }
}, { depth: 0, horizontal: 0, aim: 0 });

const partTwoOutput = partTwoPosition.depth * partTwoPosition.horizontal;

console.log(`PART 2: ${partTwoOutput}`);