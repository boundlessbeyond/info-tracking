export interface UserGame {
  name?: string;
  rules?: GameRule[];
  timeLimit?: string;
  minimum?: string;
  maximum?: string;
}

export interface GameRule {
  divisor: string;
  word: string;
}
