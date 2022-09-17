import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../model/player';

@Pipe({ name: 'city' })
export class CirtyPipe implements PipeTransform {
  transform(allPlayers: Player[]) {
    return allPlayers.filter(
      (player: Player) => !player.mafia && player.role !== 'شهروند ساده'
    );
  }
}
