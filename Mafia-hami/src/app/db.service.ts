import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private db: AngularFireDatabase) { }

  getPlayers(){
    return  this.db.database.ref('players'); 
  }

  setPlayers(playerName:string){
    const itemsRef = this.db.list('players');
    return itemsRef.push({ name: playerName });
  }
  removePlayer(key:string){
    this.db.list('players').remove(key); 
  }

  initGame(){
    var val = Math.floor(1000 + Math.random() * 9000);
     const itemsRef = this.db.list('game');
     itemsRef.set(val.toString(), { id:"1", Size: ''});
     return val;
  }
}
