import { DBService } from './../../db.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.scss'],
})
export class NightComponent implements OnInit {
  gameId = 2023;
  playerList: Array<Player> = new Array<Player>();
  faUser = faUserCheck;
  constructor(private dBService: DBService) {}

  ngOnInit(): void {
    this.dBService.getPlayers(this.gameId).subscribe((x) => {
      this.playerList = x;
    });
  }
}
