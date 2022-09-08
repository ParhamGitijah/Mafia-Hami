
import { SlideOutComponent } from './../components/slide-out/slide-out.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DBService } from '../db.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
@ViewChild(SlideOutComponent) slideOutComponent:SlideOutComponent | undefined;
  showJoin:boolean=false;
  list:Array<string>=[];
   newGameId:number | undefined;
  constructor(private dbService: DBService,private router:Router) {
  
    
   }

  ngOnInit(): void {
    
    // this.read.getPlayers().pipe().subscribe((x:Array<any>)=>{
    //   x.forEach(d => {
    //     this.list.push(d.key);
    //   });
    // });
    // this.playMusic();

    
  }

  createNewGame(){
    // this.slideOutComponent?.open();
    this.router.navigate(['/init-dashboard']);
  }


  playMusic(){
    let audio=new Audio("../assets/Band.mp3");
    // audio.src="../../assets/Band.mp3";
    // audio.load();
    audio.play();
  }
showJoinInput(){
this.showJoin=true;
}

joinGame(){
  console.log(this.newGameId+"!");
}
}
