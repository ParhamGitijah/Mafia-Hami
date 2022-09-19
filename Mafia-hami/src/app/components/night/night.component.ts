import { MafiaPipe } from './../../pipes/mafia-pipe';
import { DBService } from './../../db.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import {
  faUserCheck,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';
import { CirtyPipe } from 'src/app/pipes/city-pipe';

@Component({
  selector: 'app-night',
  templateUrl: './night.component.html',
  styleUrls: ['./night.component.scss'],
  providers: [MafiaPipe, CirtyPipe],
})
export class NightComponent implements OnInit {
  @Input() gameId: any;
  playerList: Array<Player> = new Array<Player>();
  faUser = faUserCheck;
  faSkullCrossbones = faSkullCrossbones;
  hasAllPlayersMoved: boolean = false;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  constructor(private dBService: DBService) {}

  ngOnInit(): void {
    this.dBService.getPlayers(this.gameId).subscribe((x) => {
      this.playerList = x;
      if (
        this.playerList.filter(
          (x) =>
            x.hasSelect == false &&
            x.role != 'mafia' &&
            x.alive &&
            x.role != 'medborgare'
        ).length == 0
      ) {
        this.hasAllPlayersMoved = true;
      }
    });
  }

  EndNight() {
    this.playerList.forEach((player) => {
      player.hasSelect = false;
      player.turn = false;
      if (player.life == 0 && player.isSaved == true) {
        player.life = 1;
        player.isSaved = false;
      }
      if (player.life == 0 && player.isSaved == false) {
        player.alive = false;
      }
      if (player.life < 0) {
        player.alive = false;
      }
      this.dBService.updatePlayer(this.gameId, player);
    });
    this.closeModal.emit();
    if (
      this.playerList.filter((x) => x.alive && x.mafia).length >=
      this.playerList.filter((x) => x.alive && !x.mafia).length
    ) {
      this.dBService.endGame(this.gameId, 'مافیا');
    }
    if (this.playerList.filter((x) => x.alive && x.mafia).length <= 0) {
      this.dBService.endGame(this.gameId, 'شهروندان');
    }
  }

  startPlayerTurn(player: Player) {
    player.turn = true;
    console.log('!');
    this.dBService.updatePlayer(this.gameId, player);
  }
}
