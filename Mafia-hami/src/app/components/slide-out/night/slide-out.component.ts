import { TranslateService } from '@ngx-translate/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slide-out',
  templateUrl: './slide-out.component.html',
  styleUrls: ['./slide-out.component.scss'],
})
export class SlideOutComponent implements AfterViewInit {
  @Input() gameId: any;
  @ViewChild('content') elementRef: ElementRef | undefined;
  @Input() gameSummaryLeft!: number;
  dir: string = 'rtl';
  audio = new Audio();

  constructor(
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
    private translate: TranslateService
  ) {
    // customize default values of offcanvas used by this component tree
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = true;
    this.audio.src = '../../../assets/Band.mp3';
  }
  ngAfterViewInit(): void {
    if (this.translate.currentLang == 'fa') {
      this.dir = 'rtl';
    } else {
      this.dir = 'ltr';
    }
  }
  playAudio() {
    this.audio.load();
    this.audio.play();
  }
  stopAudio() {
    this.audio.pause();
  }
  open() {
    this.playAudio();
    this.offcanvasService.open(this.elementRef, {
      position: 'bottom',
      backdrop: false,
    });
  }

  close() {
    this.stopAudio();
    this.offcanvasService.dismiss(this.elementRef);
  }
}
