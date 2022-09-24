import { DBService } from './../../db.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Player } from 'src/app/model/player';
import { Cards, randomEnum } from 'src/app/helper/randomCards-helper';
import { ThisReceiver } from '@angular/compiler';
import { Role } from 'src/app/model/role';

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
  hostId!: string;
  playerId!: string;
  player!: Player;
  showPlayerRole: boolean = false;
  gameStarted: boolean = true;
  timeLeft: number = 6;
  interval: any;

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
      this.playerList = x;
      this.player = this.playerList.find((x) => x.id == this.playerId)!;
      if (x.length > 0) {
        this.newGameStart = false;
      }
    });

    this.dbService.getGame(this.gameId).subscribe((x: Array<any>) => {
      //Is Game started?
      if (x.length == 0) {
        this.router.navigate(['']);
      }
      this.gameStarted = x.find((c: any) => c.key == 'gameStarted').value;
      if (this.gameStarted) {
        if (this.isUserHost) {
          this.router.navigate(['dashboard', this.gameId, this.hostId]);
        } else {
          var promise = new Promise((resolve) => {
            this.interval = setInterval(() => {
              if (this.timeLeft > 0) {
                this.timeLeft--;
              } else {
                this.showPlayerRole = true;
              }
            }, 1000);

            setTimeout(() => {
              resolve(this.showPlayerRole);
            }, 13000);
          });
          promise.then((x) => {
            this.router.navigate([
              '/player-dashboard',
              this.gameId,
              this.playerId,
            ]);
          });
        }
      }
    });
  }
  createNewGame() {
    this.newGameStart = true;
    this.isUserHost = true;
    this.hostId = crypto.randomUUID();
    this.gameId = this.dbService.initGame(this.hostId);

    // for (let index = 0; index < 6; index++) {
    //   var player = new Player();
    //   player.id = crypto.randomUUID();
    //   // player.name = this.userName!;
    //   player.name = this.randomString(4);
    //   this.dbService.setPlayers(this.gameId!, player);
    // }
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  randomString(length: number) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
  startTheGame(playerList: Player[]) {
    //Check number of player;
    let array = this.fillCardsBasedOnNumberPlayers();
    // let array = [
    //   'تک تیرانداز',
    //   'جان سخت',
    //   'پدر خانده',
    //   'کاراگاه',
    //   'دکتر',
    //   'دکتر لکتر',
    // ];

    let rolesToAssign = this.shuffleCards(array);
    let i = 0;
    this.playerList.forEach((x) => {
      this.dbService.updatePlayerRole(this.gameId, x.id, rolesToAssign[i++]);
    });
    this.dbService.startGame(this.gameId);
    this.router.navigate(['dashboard', this.gameId]);
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

  fillCardsBasedOnNumberPlayers(): Array<Role> {
    let array = [
      { role: 'sniper', mafia: false, life: 1 },
      { role: 'diehard', mafia: false, life: 2 },
      { role: 'godfather', mafia: true, life: 1 },
      { role: 'detectiv', mafia: false, life: 1 },
      { role: 'doctor', mafia: false, life: 1 },
      { role: 'doctorLekter', mafia: true, life: 1 },
    ];
    for (let index = 6; index < this.playerList.length; index++) {
      if (index == 8) {
        array.push({ role: 'mafia', mafia: true, life: 1 });
      } else {
        if (index == 11) {
          array.push({ role: 'mafia', mafia: true, life: 1 });
        } else {
          if (index == 14) {
            array.push({ role: 'mafia', mafia: true, life: 1 });
          } else {
            array.push({ role: 'medborgare', mafia: false, life: 1 });
          }
        }
      }
    }
    return array;
  }

  shuffleCards(array: Array<Role>) {
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
