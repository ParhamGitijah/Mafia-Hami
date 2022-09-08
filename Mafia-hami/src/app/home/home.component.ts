import { SlideOutComponent } from './../components/slide-out/slide-out.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { last, take } from 'rxjs';
import { ReadService } from '../read.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
@ViewChild(SlideOutComponent) slideOutComponent:SlideOutComponent | undefined;

  list:Array<string>=[];

  constructor(private read: ReadService) {
  
    
   }

  ngOnInit(): void {
    
    // this.read.getPlayers().pipe().subscribe((x:Array<any>)=>{
    //   x.forEach(d => {
    //     this.list.push(d.key);
    //   });
    // });
    this.playMusic();
    console.log(this.read.getPlayers());
    console.log(this.read.setPlayers("Hami")); 
    this.read.removePlayer("-NBSIB-Zif7imUeexznh");
    
  }

  createNewGame(){
    this.slideOutComponent?.open();
  }


  playMusic(){
    let audio=new Audio("../assets/Band.mp3");
    // audio.src="../../assets/Band.mp3";
    // audio.load();
    audio.play();
  }

}
