import { map, Observable, take } from 'rxjs';
import { Player } from './model/player';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Game } from './model/game';
import { Role } from './model/role';
import { Night } from './model/night';
@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor(private db: AngularFireDatabase) {}

  getPlayers(gameId: any): Observable<Array<any>> {
    console.log('getPlayers');
    return this.db.list('game/' + gameId + '/players').valueChanges();
  }
  getGame(gameId: any): Observable<any> {
    console.log('getGame');
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

  getNights(gameId: any) {
    return this.db.list('game/' + gameId + '/nights').valueChanges();
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

  createNewNight(gameId: any) {
    const itemsRef = this.db.list('game/' + gameId + '/nights');
    var dateNow = new Date().toISOString().replace('.', '');
    return itemsRef.set(dateNow, {
      id: dateNow,
    });
  }

  removeNight(gameId: any,nightId:any) {
    this.db.list('game/' + gameId + '/nights').remove(nightId);
  }

  storeActionAtNight(gameId: any, player: Player, action: string) {
    this.getNights(gameId)
      .pipe(take(1))
      .subscribe((x: any[]) => {
        const itemsRef = this.db.list(
          'game/' + gameId + '/nights/' + this.sortArray(x)[0].id + '/actions'
        );
        itemsRef.set(player.id, {
          player: player,
          selected: action,
        });
      });
  }

  storeKilledPlayersForNight(gameId: any, player: Player) {
    this.getNights(gameId)
      .pipe(take(1))
      .subscribe((x: any[]) => {
        const itemsRef = this.db.list(
          'game/' +
            gameId +
            '/nights/' +
            this.sortArray(x)[0].id +
            '/killedPlayers'
        );
        itemsRef.push(player);
      });
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
    console.log('updateNight');
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
  sortArray(array: Array<Night>) {
    return array.sort((a, b) => (a.id > b.id ? -1 : 1));
  }
}
