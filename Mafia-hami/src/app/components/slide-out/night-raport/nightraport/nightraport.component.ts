import { NightAction } from './../../../../model/night';
import { DBService } from 'src/app/db.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Night } from 'src/app/model/night';
import { take } from 'rxjs';
@Component({
  selector: 'app-nightraport',
  templateUrl: './nightraport.component.html',
  styleUrls: ['./nightraport.component.scss'],
})
export class NightraportComponent implements AfterViewInit {
  dir: string = 'rtl';
  nightList: Array<Night> = new Array();
  constructor(
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
    private translate: TranslateService,
    private dbService: DBService
  ) {
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = true;
  }

  @ViewChild('nightraport') elementRef: ElementRef | undefined;
  ngAfterViewInit(): void {
    if (this.translate.currentLang == 'fa') {
      this.dir = 'rtl';
    } else {
      this.dir = 'ltr';
    }
  }
  
  open(gameId: string) {
    this.dbService
      .getNights(gameId)
      .pipe(take(1))
      .subscribe((x: any[]) => {
        this.nightList = x;
        this.nightList.forEach((night) => {
          if (night.actions) {
            const output = Object.keys(night.actions).map((key: any) => {
              var newNightAction = new NightAction();
              newNightAction.player = night.actions[key].player;
              newNightAction.selected = night.actions[key].selected;
              return newNightAction;
            });
            night.actions = new Array<NightAction>();
            night.actions = output;
          }
        });

        this.offcanvasService.open(this.elementRef, {
          position: 'end',
          backdrop: false,
          scroll: true,
        });
      });
  }
  closeCanvas() {
    this.offcanvasService.dismiss();
  }
  sortArray(array: Array<Night>) {
    return array.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  stringName(index: number) {
    return `night${index}`;
  }
  close() {
    this.offcanvasService.dismiss(this.elementRef);
  }
}
