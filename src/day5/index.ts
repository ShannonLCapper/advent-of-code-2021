import fs from 'fs';

interface Line {
    start: Point,
    end: Point,
}

interface Point {
    x: number,
    y: number,
}

type Grid = Row[];
type Row = Array<number | undefined>;

const INPUT_FILE_PATH = 'src/day5/input.txt';

const inputText = fs.readFileSync(INPUT_FILE_PATH).toString('utf-8');
const lines = inputText
    .split('\n')
    .map((lineStr): Line => {
        const [start, end] = lineStr
            .split(' -> ')
            .map((coordStr): Point => {
                const [x, y] = coordStr
                    .split(',')
                    .map(Number);
                return { x, y };
            });
        return { start, end }
    });

function addPointToGrid(grid: Grid, point: Point) {
    if (!grid[point.y]) {
        grid[point.y] = [];
    }
    const row = grid[point.y];
    const existingCount = row[point.x] || 0;
    row[point.x] = existingCount + 1;
}

function addVerticalLineToGrid(grid: Grid, line: Line) {
    const x = line.start.x;
    const startY = Math.min(line.start.y, line.end.y);
    const endY = Math.max(line.start.y, line.end.y);

    for (let y = startY; y <= endY; y++) {
        addPointToGrid(grid, { x, y });
    }
}

function addHorizontalLineToGrid(grid: Grid, line: Line) {
    const y = line.start.y;
    const startX = Math.min(line.start.x, line.end.x);
    const endX = Math.max(line.start.x, line.end.x);

    for (let x = startX; x <= endX; x++) {
        addPointToGrid(grid, { x, y });
    }
}

function addDiagonalLineToGrid(grid: Grid, line: Line) {
    const isYIncreasing = line.end.y > line.start.y;
    const isXIncreasing = line.end.x > line.start.x;
    const lineLength = Math.abs(line.start.x - line.end.x);

    for (let offset = 0; offset <= lineLength; offset++) {
        const x = isXIncreasing ?
            line.start.x + offset:
            line.start.x - offset;
        const y = isYIncreasing ?
            line.start.y + offset :
            line.start.y - offset;
        addPointToGrid(grid, { x, y });
    }
}

function isHorizontalLine(line: Line): boolean {
    return line.start.y === line.end.y;
}

function isVerticalLine(line: Line): boolean {
    return line.start.x === line.end.x;
}

function countSquaresWithOverlaps(grid: Grid) {
    let numSquaresWithOverlaps = 0;
    grid.forEach((row) => row.forEach((value) => {
        if (typeof value === 'number' && value > 1) {
            numSquaresWithOverlaps += 1;
        }
    }));

    return numSquaresWithOverlaps;
}

// https://adventofcode.com/2021/day/5
function runPartOne() {
    const nonDiagonalLines = lines.filter(
        (line) => isHorizontalLine(line) || isVerticalLine(line)
    );
    const grid: Grid = [];
    nonDiagonalLines.forEach((line) => {
        isHorizontalLine(line) ?
            addHorizontalLineToGrid(grid, line) :
            addVerticalLineToGrid(grid, line);
    });

    return countSquaresWithOverlaps(grid);
}

const partOneOutput = runPartOne();
console.log(`PART ONE: ${partOneOutput}`);

// https://adventofcode.com/2021/day/5#part2
function runPartTwo() {
    const grid: Grid = [];
    lines.forEach((line) => {
        if (isHorizontalLine(line)) {
            addHorizontalLineToGrid(grid, line);
        }
        else if (isVerticalLine(line)) {
            addVerticalLineToGrid(grid, line);
        }
        else {
            addDiagonalLineToGrid(grid, line);
        }
    });

    return countSquaresWithOverlaps(grid);
}

const partTwoOutput = runPartTwo();
console.log(`PART TWO: ${partTwoOutput}`);