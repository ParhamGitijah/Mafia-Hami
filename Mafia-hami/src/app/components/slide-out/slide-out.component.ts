import { AfterViewInit, Component, ElementRef, OnChanges , ViewChild } from '@angular/core';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-slide-out',
  templateUrl: './slide-out.component.html',
  styleUrls: ['./slide-out.component.scss']
})
export class SlideOutComponent implements AfterViewInit {
@ViewChild("content") elementRef:ElementRef | undefined;
  constructor(config: NgbOffcanvasConfig, private offcanvasService: NgbOffcanvas) {
    // customize default values of offcanvas used by this component tree
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = true;
  }
  ngAfterViewInit(): void {
 
  }
    


  open() {
    this.offcanvasService.open(this.elementRef);
  }
}
