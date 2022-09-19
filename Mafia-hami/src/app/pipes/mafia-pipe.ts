import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../model/player';

@Pipe({ name: 'mafia' })
export class MafiaPipe implements PipeTransform {
  transform(allPlayers: Player[]) {
    return allPlayers.filter(
      (player: Player) => player.mafia && player.role !== 'mafia'
    );
  }
}
