import { Player } from './player';

export class Game {
  id!: string;
  gameStarted!: boolean;
  players!: Array<Player>;
}