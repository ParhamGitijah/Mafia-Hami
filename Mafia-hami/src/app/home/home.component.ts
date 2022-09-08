import { Component, OnInit } from '@angular/core';
import { last, take } from 'rxjs';
import { ReadService } from '../read.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list:Array<string>=[];

  constructor(private read: ReadService) {

    
   }

  ngOnInit(): void {
    // this.read.getPlayers().pipe().subscribe((x:Array<any>)=>{
    //   x.forEach(d => {
    //     this.list.push(d.key);
    //   });
    // });

    console.log(this.read.getPlayers());
    console.log(this.read.setPlayers("Hami")); 
    this.read.removePlayer("-NBSIB-Zif7imUeexznh");
    
  }

}
