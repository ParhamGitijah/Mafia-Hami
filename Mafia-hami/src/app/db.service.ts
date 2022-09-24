import { map, Observable } from 'rxjs';
import { Player } from './model/player';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Game } from './model/game';
import { Role } from './model/role';
@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor(private db: AngularFireDatabase) {}

  getPlayers(gameId: any): Observable<Array<any>> {
    return this.db.list('game/' + gameId + '/players').valueChanges();
  }
  getGame(gameId: any): Observable<any> {
    return this.db
      .list('game/' + gameId)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            value: c.payload.val(),
          }))
        )
      );
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
      isSaved: false,
      selfsaved: false,
    });
  }

  removePlayer(gameId: string, key: string) {
    this.db.list(`game/${gameId}/players`).remove(key);
  }

  initGame(hostId: any) {
    var val = Math.floor(1000 + Math.random() * 9000);
    const itemsRef = this.db.list('game');
    itemsRef.set(val.toString(), {
      id: '1',
      gameStarted: false,
      gameSummury: false,
      gameOver: false,
      winner: '',
      nightStarted: false,
      numberGameSummaryLeft: 2,
      hostId: hostId,
    });
    return val;
  }

  startGame(gameId: any) {
    const itemsRef = this.db.list('game');
    itemsRef.update(gameId.toString(), { gameStarted: true });
  }
  updateGameSummary(
    gameId: any,
    setGameSummary: boolean,
    gameSummaryLeft: number
  ) {
    const itemsRef = this.db.list(`game/`);
    itemsRef.update(gameId.toString(), {
      gameSummury: setGameSummary,
      numberGameSummaryLeft: gameSummaryLeft,
    });
  }
  updateNight(gameId: any, night: boolean) {
    const itemsRef = this.db.list(`game/`);
    itemsRef.update(gameId.toString(), {
      nightStarted: night,
    });
  }
  updatePlayerRole(gameId: any, playerKey: any, playerRole: Role) {
    const itemsRef = this.db.list(`game/${gameId}/players`);
    itemsRef.update(playerKey.toString(), {
      role: playerRole.role,
      mafia: playerRole.mafia,
      life: playerRole.life,
    });
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
      mafia: player.mafia,
      hasSelect: player.hasSelect,
      isSaved: player.isSaved,
      selfsaved: player.selfsaved,
    });
  }

  removeGame(gameId: string) {
    this.db.list('game').remove(gameId);
  }

  endGame(gameId: string, winner: string) {
    const itemsRef = this.db.list(`game`);
    itemsRef.update(gameId.toString(), { gameOver: true, winner: winner });
  }
}
