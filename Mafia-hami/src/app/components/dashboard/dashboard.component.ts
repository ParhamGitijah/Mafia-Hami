import { DBService } from './../../db.service';
import { Component, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { SlideOutComponent } from '../slide-out/slide-out.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  trackByValue: TrackByFunction<string> = (index, value) => value;

  gameId!: number;
  showRoles: boolean = false;
  gameOver: boolean = false;
  winner!: string;
  private sub: any;
  @ViewChild(SlideOutComponent) slideOutComponent:
    | SlideOutComponent
    | undefined;
  playerList: Array<Player> = new Array<Player>();
  constructor(
    private dbService: DBService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.activeRoute.params.subscribe((params) => {
      this.gameId = +params['id']; // (+) converts string 'id' to a number
    });

    this.dbService.getPlayers(this.gameId).subscribe((x) => {
      this.playerList = x;
    });
    this.dbService.getGame(this.gameId).subscribe((x: Array<any>) => {
      this.gameOver = x.find((c: any) => c.key == 'gameOver').value;
      if (this.gameOver) {
        this.winner = x.find((c: any) => c.key == 'winner').value;
      }
      console.log(this.winner);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  startNight() {
    this.dbService.updateNight(this.gameId, true);
    this.slideOutComponent?.open();
  }
  killPlayer(player: Player) {
    player.alive = false;
    this.dbService.updatePlayer(this.gameId, player);
  }
}
