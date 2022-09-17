import { MafiaPipe } from './../../pipes/mafia-pipe';
import { DBService } from './../../db.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Pipe,
} from '@angular/core';
import { Player } from 'src/app/model/player';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
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
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  constructor(private dBService: DBService) {}

  ngOnInit(): void {
    this.dBService.getPlayers(this.gameId).subscribe((x) => {
      console.log(x);
      this.playerList = x;
    });
  }

  EndNight() {
    this.playerList.forEach((player) => {
      console.log(player);
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
    console.log(this.gameId);
    this.closeModal.emit();
  }

  startPlayerTurn(player: Player) {
    player.turn = true;
    this.dBService.updatePlayer(this.gameId, player);
  }
}
