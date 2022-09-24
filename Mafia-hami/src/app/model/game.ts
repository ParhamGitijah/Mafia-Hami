import { Player } from './player';

export class Game {
  id!: string;
  gameStarted!: boolean;
  players!: Array<Player>;
  gameSummury!: false;
  gameOver!: false;
  winner!: string;
  nightStarted!: boolean;
  numberGameSummaryLeft!: number;
  hostId!: string;
}
