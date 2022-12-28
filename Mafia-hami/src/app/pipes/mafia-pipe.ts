import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../model/player';

@Pipe({ name: 'mafia' })
export class MafiaPipe implements PipeTransform {
  transform(allPlayers: Player[]) {
    if (
      allPlayers.filter(
        (player: Player) =>
          player.alive &&
          (player.role == 'godfather' || player.role == 'doctorLekter')
      ).length <= 0
    ) {
      var result = allPlayers.filter(
        (player: Player) => player.mafia && player.role !== 'mafia'
      );
      var simpleMafia = allPlayers.find(
        (player: Player) => player.mafia && player.alive
      )!;
      if (simpleMafia !== undefined) {
        result.push(simpleMafia);
      }
      return result;
    } else {
      return allPlayers.filter(
        (player: Player) => player.mafia && player.role !== 'mafia'
      );
    }
  }
}
