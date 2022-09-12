import { SlideOutComponent } from './../components/slide-out/slide-out.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DBService } from '../db.service';
import { Router } from '@angular/router';
import { Player } from '../model/player';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(SlideOutComponent) slideOutComponent:
    | SlideOutComponent
    | undefined;
  showJoin: boolean = false;
  list: Array<string> = [];
  newGameId: number | undefined;
  userName: string | undefined;
  player: Player = new Player();

  constructor(private dbService: DBService, private router: Router) {}

  ngOnInit(): void {}

  createNewGame() {
    // this.slideOutComponent?.open();
    this.router.navigate(['/init-dashboard']);
  }

  playMusic() {
    let audio = new Audio('../assets/Band.mp3');
    // audio.src="../../assets/Band.mp3";
    // audio.load();
    audio.play();
  }
  showJoinInput() {
    this.showJoin = true;
  }

  joinGame() {
    this.dbService
      .getGame(this.newGameId)
      .pipe(take(1))
      .subscribe((x: Array<any>) => {
        if (x.length > 0) {
          // for (let index = 0; index < 7; index++) {
          //   this.player.id = crypto.randomUUID();
          //   // this.player.name = this.userName!;
          //   this.player.name = this.randomString(4);
          //   this.dbService.setPlayers(this.newGameId!, this.player);
          //   this.router.navigate(['/init-dashboard', this.newGameId]);
          // }
          this.player.id = crypto.randomUUID();
          this.player.name = this.userName!;

          this.dbService.setPlayers(this.newGameId!, this.player);
          this.router.navigate([
            '/init-dashboard',
            this.newGameId,
            this.player.id,
          ]);
        } else {
          //show error
          this.newGameId = undefined;
        }
      });
  }

  randomString(length: number) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }
}
