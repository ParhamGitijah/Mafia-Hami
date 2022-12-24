import { Player } from './player';

export class Night {
  id!: string;
  actions!: NightAction[];
  killedPlayers!: Player[];
}

export class NightAction {
  player!: Player;
  selected!: string;
}
