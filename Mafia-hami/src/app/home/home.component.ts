import { TranslateService } from '@ngx-translate/core';
import { SlideOutComponent } from './../components/slide-out/night/slide-out.component';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';

import { DBService } from '../db.service';
import { Router } from '@angular/router';
import { Player } from '../model/player';
import { take } from 'rxjs';

import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';
import { Camera, CameraResultType } from '@capacitor/camera';

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
  dir!: string;
  cameraActive = false;
  image: any = null;
  gameStartedError: boolean = false;
  playerExistError: boolean = false;
  constructor(
    private dbService: DBService,
    private router: Router,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.translate.currentLang == 'fa') {
      this.dir = 'rtl';
    } else {
      this.dir = 'ltr';
    }
  }

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
        if (
          x.length > 0 &&
          x.find((c: any) => c.key == 'gameStarted').value == false
        ) {
          // for (let index = 0; index < 7; index++) {
          //   this.player.id = crypto.randomUUID();
          //   // this.player.name = this.userName!;
          //   this.player.name = this.randomString(4);
          //   this.dbService.setPlayers(this.newGameId!, this.player);
          //   this.router.navigate(['/init-dashboard', this.newGameId]);
          // }

          this.player.id = crypto.randomUUID();
          this.player.name = this.userName!;
          this.player.image = this.image;
          this.dbService.setPlayers(this.newGameId!, this.player);
          this.router.navigate([
            '/init-dashboard',
            this.newGameId,
            this.player.id,
          ]);
        } else {
          //show error
          this.newGameId = undefined;
          this.gameStartedError = true;
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

  langChoosed(lang: string) {
    this.ngZone.run(() => this.translate.use(lang));
  }

  async openCamera() {
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: true,
    //   resultType: CameraResultType.Uri
    // });
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'front',
      parent: 'cameraPreview',
      className: 'cameraPreview',
      disableAudio:true,
      toBack:true
    };
    await CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;
  }

  async flipCamera() {
    await CameraPreview.flip();
  }

  async stopCamera() {
    await CameraPreview.stop();
    this.cameraActive = false;
  }
  async captureImage() {
    const cameraPreviewPicOptions: CameraPreviewPictureOptions = {
      quality: 90,
    };

    const result = await CameraPreview.capture(cameraPreviewPicOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    await this.stopCamera();
  }
}
