import { TranslateService } from '@ngx-translate/core';
import { DBService } from './../../db.service';
import { Component, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { SlideOutComponent } from '../slide-out/slide-out.component';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  trackByValue: TrackByFunction<string> = (index, value) => value;

  gameId!: number;
  showRoles: boolean = false;
  game: Game = new Game();
  hostId!: string;
  private sub: any;
  dir!: string;
  @ViewChild(SlideOutComponent) slideOutComponent:
    | SlideOutComponent
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
      this.dir = 'rtl';
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
      console.log(this.game.winner);
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
    this.slideOutComponent?.open();
  }
  killPlayer(player: Player) {
    player.alive = false;
    this.dbService.updatePlayer(this.gameId, player);
  }
  redirectToStartPage() {
    this.router.navigate(['']);
  }
}
