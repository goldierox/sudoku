import { Difficulty, SudokuGame } from "./definitions";

export function generateSudoku(difficulty: Difficulty): SudokuGame {
    let board = generateCompletedBoard();
    let solution = board.map(row => [...row]); // Deep copy of the board for the solution
    let attempts = setRemovalAttempts(difficulty);
    removeNumbersFromBoard(board, attempts);

    return {
        board,
        solution,
        difficulty
    };
}

function setRemovalAttempts(difficulty: Difficulty): number {
    switch (difficulty) {
        case Difficulty.Easy:
            return 36;  // Remove fewer numbers for easier puzzles
        case Difficulty.Medium:
            return 46;
        case Difficulty.Hard:
            return 52;
        case Difficulty.Expert:
            return 58; // Remove more numbers for harder puzzles
    }
}

function removeNumbersFromBoard(board: number[][], attempts: number): void {
    while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            let backup = board[row][col];
            board[row][col] = 0;

            // Copy the board to check the puzzle's solution count
            let tempBoard = board.map(row => [...row]);
            if (!fillBoard(tempBoard)) { // TODO explore possibility of unique solutions
                board[row][col] = backup; // Put the number back if removing it makes the puzzle unsolvable or TODO non-unique
            } else {
                attempts--;
            }
        }
    }
}

function generateCompletedBoard(): number[][] {
    let board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
    if (!fillBoard(board)) {
        throw new Error('Failed to generate a Sudoku board');
    }

    return board;
}

function fillBoard(board: number[][]): boolean {
    let emptySpot = findEmptySpot(board);
    if (!emptySpot) {
        // No empty spot means the board is successfully filled
        return true;
    }
    let [row, col] = emptySpot;

    for (let num = 1; num <= 9; num++) {
        if (noConflicts(board, row, col, num)) {
            board[row][col] = num;

            if (fillBoard(board)) {
                return true;
            }

            // Undo the current cell for backtracking
            board[row][col] = 0;
        }
    }

    // Trigger backtracking
    return false;
}

function findEmptySpot(board: number[][]): [number, number] | null {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === 0) {  // Assuming 0 is the placeholder for empty cells
                return [row, col];
            }
        }
    }
    return null;
}

function noConflicts(board: number[][], row: number, col: number, num: number): boolean {
    return (
        !inRow(board, row, num) &&
        !inColumn(board, col, num) &&
        !inBox(board, row, col, num)
    );
}

function inRow(board: number[][], row: number, num: number): boolean {
    for (let col = 0; col < 9; col++) {
        if (board[row][col] === num) {
            return true;
        }
    }
    return false;
}

function inColumn(board: number[][], col: number, num: number): boolean {
    for (let row = 0; row < 9; row++) {
        if (board[row][col] === num) {
            return true;
        }
    }
    return false;
}

function inBox(board: number[][], row: number, col: number, num: number): boolean {
    const startRow = row - row % 3;
    const startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return true;
            }
        }
    }
    return false;
}