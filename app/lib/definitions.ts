export enum Difficulty {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard",
    Expert = "Expert"
}

export interface SudokuGame {
    board: number[][];
    solution: number[][];
    difficulty: Difficulty;
}

export interface GameState {
    board: number[][]; // 9x9 grid with values from 0 (empty) to 9
    initialBoard: number[][]; // Stores the initial state of the puzzle for resets
    status: 'playing' | 'completed' | 'paused'; // Current status of the game
    difficulty: 'easy' | 'medium' | 'hard' | 'expert'; // Difficulty level of the puzzle
    startTime?: Date; // When the user started the current game
    endTime?: Date; // When the user completed the game
}

export interface User {
    id: string;
    username: string;
    email: string;
    hashedPassword: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface GameHistory {
    gameId: string;
    userId: string; // Reference to the User model
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    solved: boolean;
    startTime: Date;
    endTime: Date;
    duration: number; // Total game time in seconds
}

export interface LeaderboardEntry {
    userId: string;
    username: string;
    bestTime: number; // Best time in seconds
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}