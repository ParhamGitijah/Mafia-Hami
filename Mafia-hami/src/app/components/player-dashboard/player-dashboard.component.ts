import { TranslateService } from '@ngx-translate/core';
import { interval, Observable, of, startWith, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/db.service';
import { RepositoryService } from 'src/app/repository.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-player-dashboard',
  templateUrl: './player-dashboard.component.html',
  styleUrls: ['./player-dashboard.component.scss'],
})
export class PlayerDashboardComponent implements OnInit {
  constructor(
    private dbService: DBService,
    private activeRoute: ActivatedRoute,
    private repo: RepositoryService,
    private router: Router,
    private translate: TranslateService
  ) {}

  showPlayerRole = false;
  playerToKillSelectReq = false;
  playerList: Array<Player> = new Array();
  playerId!: string;
  isMafia: boolean | undefined;
  playerSelected: Player | undefined;
  playerToKillSelect: Player | undefined;
  player: Observable<Player> = new Observable<Player>();
  playerAlive: boolean = true;
  gameId!: number;
  isNight!: boolean;
  isGameFinished!: boolean;
  turn: boolean = false;
  doctoLekterList!: Array<Player>;
  emptyList = false;
  selfRole: string | undefined;
  winner!: string;
  dir!: string;
  ngOnInit(): void {
    if (this.translate.currentLang == 'fa') {
      this.dir = 'rtl';
    } else {
      this.dir = 'ltr';
    }
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.activeRoute.params)
      )
      .subscribe((params) => {
        this.gameId = +params['id']; // (+) converts string 'id' to a number
        this.playerId = params['playerId'];
        this.dbService.getGame(this.gameId).subscribe((x: Array<any>) => {
          if (!this.playerSelected) {
            if (this.playerToKillSelectReq && this.playerToKillSelect) {
              return;
            }
            if (x.length !== 0) {
              this.isNight = x.find((c: any) => c.key == 'nightStarted').value;
              this.isGameFinished = x.find(
                (c: any) => c.key == 'gameOver'
              ).value;
              this.winner = x.find((c: any) => c.key == 'winner').value;
            }
            this.dbService
              .getPlayers(this.gameId)
              .pipe(take(1))
              .subscribe((x: Player[]) => {
                let player = x.find((x) => x.id == this.playerId);
                if (player) {
                  if (player.role == 'doctor' && !player.selfsaved) {
                    this.playerList = x.filter((x) => x.alive == true);
                  } else {
                    this.playerList = x.filter(
                      (x) => x.alive == true && x.id != this.playerId
                    );
                  }
                  this.doctoLekterList = cloneDeep(
                    x.filter((x) => x.alive == true && x.mafia && !x.selfsaved)
                  );
                  if (this.doctoLekterList.length <= 0) {
                    this.emptyList = true;
                  }
                  this.playerAlive = player.alive;
                  this.selfRole = player.role;
                  this.turn = player.turn;
                  this.player = of(player);
                }
              });
          }
        });
      });
  }

  selectPlayer(player: Player) {
    this.playerSelected = player;
    for (let index = 0; index < this.playerList.length; index++) {
      if (this.playerList[index].id != player.id) {
        this.playerList[index].selected = false;
      } else {
        this.playerList[index].selected = true;
      }
    }
  }

  selectPlayerToKill(player: Player) {
    this.playerToKillSelect = player;
    for (let index = 0; index < this.playerList.length; index++) {
      if (this.playerList[index].id != player.id) {
        this.playerList[index].selected = false;
      } else {
        this.playerList[index].selected = true;
      }
    }
  }

  selectPlayerDocLek(player: Player) {
    this.playerSelected = player;
    console.log('1');
    for (let index = 0; index < this.doctoLekterList.length; index++) {
      if (this.doctoLekterList[index].id != player.id) {
        this.doctoLekterList[index].selected = false;
      } else {
        this.doctoLekterList[index].selected = true;
      }
    }
  }

  sumbitSelect() {
    this.player.pipe(take(1)).subscribe((player) => {
      this.isMafia = this.repo.submitSelect(
        player,
        this.playerSelected!,
        this.gameId
      );
      if (this.playerToKillSelectReq) {
        this.repo.killPlayer(player, this.playerToKillSelect!, this.gameId);
      }
      if (this.isMafia != undefined) {
        var timer = 0;
        if (this.selfRole == 'detectiv') {
          this.showPlayerRole = true;
          timer = 4500;
        }
        var promise = new Promise((resolve) => {
          setTimeout(() => {
            this.showPlayerRole = false;
            this.isMafia = undefined;
            resolve(this.showPlayerRole);
          }, timer);
        });
      }
      this.playerSelected = undefined;
      this.playerToKillSelect = undefined;
    });
  }
  redirectToStartPage() {
    this.router.navigate(['']);
  }

  isGodfatherAlive() {
    if (
      this.playerList.filter((x) => x.role == 'godfather' && x.alive == true)
        .length > 0
    ) {
      this.playerToKillSelectReq = false;
      return true;
    } else {
      this.playerToKillSelectReq = true;
      return false;
    }
  }
}
