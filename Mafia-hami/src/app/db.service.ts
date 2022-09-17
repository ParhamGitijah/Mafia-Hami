import { Observable } from 'rxjs';
import { Player } from './model/player';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Game } from './model/game';
@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor(private db: AngularFireDatabase) {}

  getPlayers(gameId: any): Observable<Array<any>> {
    return this.db.list('game/' + gameId + '/players').valueChanges();
  }
  getGame(gameId: any): Observable<any> {
    return this.db.list('game/' + gameId).valueChanges();
  }
  setPlayers(gameId: number, player: Player) {
    const itemsRef = this.db.list('game/' + gameId + '/players');
    return itemsRef.set(player.id, {
      id: player.id,
      name: player.name,
      alive: true,
      role: '',
      turn: false,
      mafia: false,
      life: 0,
      hasSelect: false,
    });
  }

  removePlayer(gameId: string, key: string) {
    this.db.list(`game/${gameId}/players`).remove(key);
  }

  initGame() {
    var val = Math.floor(1000 + Math.random() * 9000);
    const itemsRef = this.db.list('game');
    itemsRef.set(val.toString(), {
      id: '1',
      gameStarted: false,
      gameSummury: false,
    });
    return val;
  }

  startGame(gameId: any) {
    const itemsRef = this.db.list('game');
    itemsRef.update(gameId.toString(), { gameStarted: true });
  }
  updateGameSummary(gameId: any) {
    const itemsRef = this.db.list(`game/${gameId}`);
    itemsRef.update(gameId.toString(), {
      gameSummury: true,
    });
  }

  updatePlayerRole(gameId: any, playerKey: any, playerRole: any) {
    const itemsRef = this.db.list(`game/${gameId}/players`);
    itemsRef.update(playerKey.toString(), { role: playerRole });
  }
  updatePlayerTurn(gameId: any, playerKey: any, turn: boolean) {
    const itemsRef = this.db.list(`game/${gameId}/players`);
    itemsRef.update(playerKey.toString(), { turn: turn });
  }
  updatePlayer(gameId: any, player: Player) {
    const itemsRef = this.db.list(`game/${gameId}/players`);
    itemsRef.update(player.id.toString(), {
      alive: player.alive,
      life: player.life,
      id: player.id,
      name: player.name,
      role: player.role,
      turn: player.turn,
      hasSelect: player.hasSelect,
    });
  }

  removeGame(gameId: string) {
    this.db.list('game').remove(gameId);
  }
}
