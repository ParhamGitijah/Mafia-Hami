import { TranslateService } from '@ngx-translate/core';
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
  dir!: string;
  playerList: Array<Player> = new Array<Player>();
  faUser = faUserCheck;
  faSkullCrossbones = faSkullCrossbones;
  hasAllPlayersMoved: boolean = false;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() gameSummaryLeft!: number;
  constructor(
    private dBService: DBService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.translate.currentLang == 'fa') {
      this.dir = 'rtl';
    } else {
      this.dir = 'ltr';
    }
    this.dBService.getPlayers(this.gameId).subscribe((x) => {
      this.playerList = x;
      var diehard = this.playerList.find((x) => x.role == 'diehard');
      if (
        this.playerList.filter(
          (x) =>
            x.hasSelect == false &&
            x.role != 'mafia' &&
            x.alive &&
            x.role != 'medborgare' &&
            x.role != 'diehard'
        ).length == 0
      ) {
        this.hasAllPlayersMoved = true;
      }
      if (
        diehard != undefined &&
        diehard.alive &&
        this.gameSummaryLeft > 0 &&
        !diehard.hasSelect
      ) {
        this.hasAllPlayersMoved = false;
      }
    });
  }

  EndNight() {
    this.dBService.updateNight(this.gameId, false);
    this.playerList.forEach((player) => {
      player.hasSelect = false;
      player.turn = false;
      if (player.life == 0 && player.isSaved == true) {
        player.life = 1;
      }
      if (player.life == 0 && player.isSaved == false) {
        player.alive = false;
      }
      if (player.life < 0) {
        player.alive = false;
      }
      player.isSaved = false;
      this.dBService.updatePlayer(this.gameId, player);
    });
    this.closeModal.emit();
    if (
      this.playerList.filter((x) => x.alive && x.mafia).length >=
      this.playerList.filter((x) => x.alive && !x.mafia).length
    ) {
      this.dBService.endGame(this.gameId, 'isMafia');
    }
    if (this.playerList.filter((x) => x.alive && x.mafia).length <= 0) {
      this.dBService.endGame(this.gameId, 'isMedborgare');
    }
  }

  startPlayerTurn(player: Player) {
    player.turn = true;

    this.dBService.updatePlayer(this.gameId, player);
  }
  updateGameStatus(player: Player, gameSummury: boolean) {
    player.hasSelect = true;
    this.gameSummaryLeft = this.gameSummaryLeft - 1;
    this.dBService.updateGameSummary(this.gameId, true, this.gameSummaryLeft);
    this.dBService.updatePlayer(this.gameId, player);
    this.dBService.storeActionAtNight(this.gameId, player, 'Yes');
  }
  noSelect(player: Player) {
    player.hasSelect = true;
    this.dBService.updatePlayer(this.gameId, player);
    this.dBService.storeActionAtNight(this.gameId, player, 'No');
  }
}
