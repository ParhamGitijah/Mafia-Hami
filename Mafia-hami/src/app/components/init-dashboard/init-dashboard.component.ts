import { DBService } from './../../db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Player } from 'src/app/model/player';
import { Cards, randomEnum } from 'src/app/helper/randomCards-helper';
import { ThisReceiver } from '@angular/compiler';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-init-dashboard',
  templateUrl: './init-dashboard.component.html',
  styleUrls: ['./init-dashboard.component.scss'],
})
export class InitDashboardComponent implements OnInit {
  gameId!: number;
  playerList: Array<Player> = new Array<Player>();
  private sub: any;
  newGameStart: boolean = false;
  isUserHost: boolean = false;
  playerId!: string;
  constructor(
    private dbService: DBService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe((params) => {
      this.gameId = +params['id']; // (+) converts string 'id' to a number
      this.playerId = params['playerId'];
      if (this.gameId) {
      } else {
        this.createNewGame();
      }
    });

    this.dbService.getPlayers(this.gameId).subscribe((x) => {
      console.log(x);
      this.playerList = x;
      if (x.length > 0) {
        this.newGameStart = false;
      }
    });

    this.dbService.getGame(this.gameId).subscribe((x) => {
      //Is Game started?
      if (x[0] == true) {
        if (this.isUserHost) {
          this.router.navigate(['dashboard', this.gameId]);
        } else {
        }
      }
    });
  }
  createNewGame() {
    this.newGameStart = true;
    this.isUserHost = true;
    this.gameId = this.dbService.initGame();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  startTheGame() {
    let array = [
      'sniper',
      'direhard',
      'godfather',
      'detectiv',
      'doctor',
      'doctorLekter',
    ];
    let rolesToAssign = this.shuffleCards(array);
    let i = 0;
    this.playerList.forEach((x) => {
      this.dbService.updatePlayerRole(this.gameId, x.id, rolesToAssign[i++]);
    });
    this.dbService.startGame(this.gameId);
  }

  playerExit() {
    if (this.isUserHost) {
      this.dbService.removeGame(this.gameId.toString());
      this.router.navigate(['']);
    } else {
      this.dbService.removePlayer(this.gameId.toString(), this.playerId);
      this.router.navigate(['']);
    }
  }

  shuffleCards(array: Array<string>) {
    var m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
