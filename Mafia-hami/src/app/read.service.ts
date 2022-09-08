import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class ReadService {

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
}
