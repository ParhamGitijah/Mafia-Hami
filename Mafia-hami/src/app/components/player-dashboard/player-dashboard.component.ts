import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/model/player';
import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/db.service';
import { RepositoryService } from 'src/app/repository.service';

@Component({
  selector: 'app-player-dashboard',
  templateUrl: './player-dashboard.component.html',
  styleUrls: ['./player-dashboard.component.scss'],
})
export class PlayerDashboardComponent implements OnInit {
  constructor(
    private dbService: DBService,
    private activeRoute: ActivatedRoute,
    private repo: RepositoryService
  ) {}

  playerList: Array<Player> = new Array();
  waitingForNight: boolean = true;
  playerId!: string;
  playerSelected!: Player;
  player: Observable<Player> = new Observable<Player>();
  gameId!: number;
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.gameId = +params['id']; // (+) converts string 'id' to a number
      this.playerId = params['playerId'];
    });

    this.dbService.getPlayers(this.gameId).subscribe((x: Player[]) => {
      if (x.find((x) => x.id == this.playerId)) {
        this.playerList = x;
        this.player = of(x.find((x) => x.id == this.playerId)!);
      }
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

  sumbitSelect() {
    this.player.subscribe((player) => {
      this.repo.submitSelect({
        player,
        selectedPlayer: this.playerSelected,
        gameId: this.gameId,
      });
    });
  }
}
