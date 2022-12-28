import { Player } from 'src/app/model/player';
import { DBService } from 'src/app/db.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  array = [
    'sniper',
    'direhard',
    'godfather',
    'detectiv',
    'doctor',
    'doctorLekter',
  ];

  constructor(private dbService: DBService) {}

  submitSelect(player: Player, selectedPlayer: Player, gameId: any) {
    player.turn = false;
    player.hasSelect = true;
    this.dbService.updatePlayer(gameId, player);
    if (!selectedPlayer) {
      player.turn = false;
      player.hasSelect = true;
      this.dbService.updatePlayer(gameId, player);
      return selectedPlayer;
    }
    this.dbService.storeActionAtNight(gameId, player, selectedPlayer.name);
    //doctor
    if (player.role == 'doctor') {
      if (selectedPlayer.mafia == false) {
        if (player.role == selectedPlayer.role && player.selfsaved != true) {
          player.isSaved = true;
          player.selfsaved = true;
          this.dbService.updatePlayer(gameId, player);
        }
        if (player.role !== selectedPlayer.role) {
          selectedPlayer.isSaved = true;
          this.dbService.updatePlayer(gameId, selectedPlayer);
        }
      }
    }

    //sniper
    if (player.role == 'sniper') {
      if (selectedPlayer.mafia) {
        selectedPlayer.life = selectedPlayer.life - 1;
        this.dbService.updatePlayer(gameId, selectedPlayer);
      } else {
        player.life = -100;
        this.dbService.updatePlayer(gameId, player);
      }
    }

    //detectiv
    if (player.role == 'detectiv') {
      player.turn = false;
      player.hasSelect = true;
      this.dbService.updatePlayer(gameId, player);
      if (selectedPlayer.role == 'godfather' || selectedPlayer.mafia == false) {
        return false;
      } else {
        return true;
      }
    }

    //godfather
    if (player.role == 'godfather') {
      if (selectedPlayer.role == 'diehard') {
        if (selectedPlayer.life > 1) {
          selectedPlayer.life = selectedPlayer.life - 1;
        } else {
          if (selectedPlayer.isSaved == false) {
            selectedPlayer.life = selectedPlayer.life - 1;
          }
        }
      } else {
        if (selectedPlayer.isSaved == false) {
          selectedPlayer.life = selectedPlayer.life - 1;
        }
      }
      this.dbService.updatePlayer(gameId, selectedPlayer);
    }

    //Doctor Lekter
    if (player.role == 'doctorLekter') {
      if (selectedPlayer.mafia) {
        if (
          player.role == selectedPlayer.role &&
          selectedPlayer.selfsaved == false
        ) {
          player.isSaved = true;
          player.selfsaved = true;
          this.dbService.updatePlayer(gameId, player);
        }
        if (player.role !== selectedPlayer.role) {
          selectedPlayer.isSaved = true;
          this.dbService.updatePlayer(gameId, selectedPlayer);
        }
      }
    }
  }

  //use this metod only when godfather is dead
  killPlayer(player: Player, selectedPlayer: Player, gameId: any) {
    if (!selectedPlayer) {
      return selectedPlayer;
    }
    this.dbService.storeActionAtNight(gameId, player, selectedPlayer.name);
    //need to be mafia
    if (player.mafia == true) {
      if (selectedPlayer.role == 'diehard') {
        if (selectedPlayer.life > 1) {
          selectedPlayer.life = selectedPlayer.life - 1;
        } else {
          if (selectedPlayer.isSaved == false) {
            selectedPlayer.life = selectedPlayer.life - 1;
          }
        }
      } else {
        if (selectedPlayer.isSaved == false) {
          selectedPlayer.life = selectedPlayer.life - 1;
        }
      }
      this.dbService.updatePlayer(gameId, selectedPlayer);
    }
  }
}
