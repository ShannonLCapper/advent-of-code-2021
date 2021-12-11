import fs from 'fs';

interface Square {
    value: number,
    isMarked: boolean,
}
type Row = Square[];
type Board = Row[];

const INPUT_FILE_PATH = 'src/day4/input.txt';

const inputText = fs.readFileSync(INPUT_FILE_PATH).toString('utf-8');
const [drawnNumberStr, ...boardStrs] = inputText.split('\n\n');
const drawnNumbers = drawnNumberStr.split(',').map(Number);
const startingBoards: Board[] = boardStrs.map((boardStr) => {
    return boardStr
        .split('\n')
        .map((row) => row
            .split(/\s+/)
            .filter((str) => !!str)
            .map((numStr) => ({
                value: parseInt(numStr),
                isMarked: false,
            }))
        );
});

function isBoardSolved(board: Board): boolean {
    const hasFullRow = board.some((row) => row.every((square) => square.isMarked));
    if (hasFullRow) {
        return true;
    }
    const numColumns = board[0].length;
    for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        const isWholeColumnMarked = board.every((row) => row[columnIndex].isMarked);
        if (isWholeColumnMarked) {
            return true;
        }
    }
    return false;
}

function markValueOnBoard(board: Board, value: number): Board {
    return board.map((row) => row.map((square) => {
        const updatedSquare = {...square};
        if (square.value === value) {
            updatedSquare.isMarked = true;
        }
        return updatedSquare;
    }));
}

function sumUnmarkedSquares(board: Board): number {
    let sum = 0;
    board.forEach((row) => row.forEach((square) => {
        if (!square.isMarked) {
            sum += square.value;
        }
    }));
    return sum;
}

// https://adventofcode.com/2021/day/4
function runPartOne(starterBoards: Board[], numbers: number[]): number {
    let currentBoards = starterBoards;
    for (let i = 0; i < numbers.length; i++) {
        const drawnNumber = numbers[i];
        currentBoards = currentBoards.map((board) => markValueOnBoard(board, drawnNumber));
        const solvedBoard = currentBoards.find(isBoardSolved);

        if (solvedBoard) {
            return sumUnmarkedSquares(solvedBoard) * drawnNumber;
        }
    }
    throw new Error('No solved boards after all numbers drawn');
}

const partOneOutput = runPartOne(startingBoards, drawnNumbers)
console.log(`PART ONE: ${partOneOutput}`);

// https://adventofcode.com/2021/day/4#part2
function runPartTwo(starterBoards: Board[], numbers: number[]): number {
    let unsolvedBoards = starterBoards;
    for (let i = 0; i < numbers.length; i++) {
        const drawnNumber = numbers[i];
        const updatedBoards = unsolvedBoards
            .map((board) => markValueOnBoard(board, drawnNumber));

        unsolvedBoards = updatedBoards.filter((board) => !isBoardSolved(board));
        
        if (updatedBoards.length === 1 && unsolvedBoards.length === 0) {
            return sumUnmarkedSquares(updatedBoards[0]) * drawnNumber
        }
    }
    throw new Error('No solved boards after all numbers drawn');
}

const partTwoOutput = runPartTwo(startingBoards, drawnNumbers)
console.log(`PART TWO: ${partTwoOutput}`);