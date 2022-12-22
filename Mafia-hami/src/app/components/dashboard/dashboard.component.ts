import { NightraportComponent } from './../slide-out/night-raport/nightraport/nightraport.component';
import { TranslateService } from '@ngx-translate/core';
import { DBService } from './../../db.service';
import { Component, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { SlideOutComponent } from '../slide-out/night/slide-out.component';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  trackByValue: TrackByFunction<string> = (index, value) => value;
  isSlideModalOpen = false;
  gameId!: number;
  showRoles: boolean = false;
  game: Game = new Game();
  hostId!: string;
  private sub: any;
  dir!: string;
  @ViewChild(SlideOutComponent) slideOutComponent:
    | SlideOutComponent
    | undefined;

  @ViewChild(NightraportComponent) nightRaportComponent:
    | NightraportComponent
    | undefined;
  playerList: Array<Player> = new Array<Player>();
  constructor(
    private dbService: DBService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.translate.currentLang == 'fa') {
      this.dir = 'ltr';
    } else {
      this.dir = 'ltr';
    }

    this.sub = this.activeRoute.params.subscribe((params) => {
      this.gameId = +params['id']; // (+) converts string 'id' to a number
      this.hostId = params['hostId']; // (+) converts string 'id' to a number
    });

    this.dbService.getPlayers(this.gameId).subscribe((x) => {
      this.playerList = x;
    });
    this.dbService.getGame(this.gameId).subscribe((x: Array<any>) => {
      if (
        x.find((c: any) => c.key == 'nightStarted').value == true &&
        this.isSlideModalOpen != true
      ) {
        this.isSlideModalOpen = true;
        this.slideOutComponent?.open();
      }
      if (
        x.find((c: any) => c.key == 'nightStarted').value == false
      ) {
        this.isSlideModalOpen = false;
      }

      this.game.gameOver = x.find((c: any) => c.key == 'gameOver').value;
      this.game.hostId = x.find((c: any) => c.key == 'hostId').value;
      if (this.game.hostId !== this.hostId) {
        this.redirectToStartPage();
      }
      this.game.numberGameSummaryLeft = x.find(
        (c: any) => c.key == 'numberGameSummaryLeft'
      ).value;
      this.game.gameSummury = x.find((c: any) => c.key == 'gameSummury').value;
      if (this.game.gameOver) {
        this.game.winner = x.find((c: any) => c.key == 'winner').value;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  startNight() {
    this.dbService.updateNight(this.gameId, true);
    this.dbService.updateGameSummary(
      this.gameId,
      false,
      this.game.numberGameSummaryLeft
    );
    this.dbService.createNewNight(this.gameId);
    this.slideOutComponent?.open();
  }

  showNightsRaport() {
    this.nightRaportComponent?.open(this.gameId.toString());
  }
  killPlayer(player: Player) {
    player.alive = false;
    this.dbService.updatePlayer(this.gameId, player);
    if (
      this.playerList.filter((x) => x.alive && x.mafia).length >=
      this.playerList.filter((x) => x.alive && !x.mafia).length
    ) {
      this.dbService.endGame(this.gameId.toString(), 'isMafia');
    }
    if (this.playerList.filter((x) => x.alive && x.mafia).length <= 0) {
      this.dbService.endGame(this.gameId.toString(), 'isMedborgare');
    }
  }
  redirectToStartPage() {
    this.router.navigate(['']);
  }

  isAnyPlayerDead(){
    return this.playerList.find(x=>x.alive!=true)!=undefined;
  }
}
