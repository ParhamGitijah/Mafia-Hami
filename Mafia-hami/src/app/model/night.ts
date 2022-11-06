import { Player } from './player';

export class Night {
  id!: string;
  actions!: NightAction[];
}

export class NightAction {
  player!: Player;
  selected!: string;
}
