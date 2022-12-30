import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../model/player';

@Pipe({ name: 'mafia' })
export class MafiaPipe implements PipeTransform {
  transform(allPlayers: Player[]) {
    if (allPlayers.length <= 0) {
      return allPlayers;
    }
    if (
      allPlayers.filter(
        (player: Player) =>
          player.alive == true &&
          (player.role == 'godfather' || player.role == 'doctorLekter')
      ).length <= 0
    ) {
      var result = allPlayers.filter(
        (player: Player) => player.mafia && player.role !== 'mafia' && player.alive
      );
      
      var simpleMafia = allPlayers.find(
        (player: Player) => player.mafia && player.alive && player.role == 'mafia'
      )!;
      if (simpleMafia !== undefined) {
        result.push(simpleMafia);
      }
      var resultToReturn = new Array<Player>();
      resultToReturn.push(result[0]);
      return resultToReturn;
    } else {
      return allPlayers.filter(
        (player: Player) =>
          player.mafia &&
          (player.role == 'godfather' || player.role == 'doctorLekter')
      );
    }
  }
}
