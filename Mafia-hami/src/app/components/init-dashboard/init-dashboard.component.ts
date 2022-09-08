import { DBService } from './../../db.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-init-dashboard',
  templateUrl: './init-dashboard.component.html',
  styleUrls: ['./init-dashboard.component.scss']
})
export class InitDashboardComponent implements OnInit {

  gameId:number | undefined;

  constructor(private dbService:DBService) {


   }

  ngOnInit(): void {
this.createNewGame();
  }
createNewGame(){
    // this.slideOutComponent?.open();
   this.gameId=this.dbService.initGame();
    }
  

}
