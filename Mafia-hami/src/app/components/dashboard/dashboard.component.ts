import { DBService } from './../../db.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { SlideOutComponent } from '../slide-out/slide-out.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  gameId!: number;
  showRoles: boolean = false;
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
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  startNight() {
    this.slideOutComponent?.open();
  }
}
