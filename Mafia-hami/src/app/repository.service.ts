import { Player } from 'src/app/model/player';
import { DBService } from 'src/app/db.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  array = [
    'sniper',
    'direhard',
    'godfather',
    'detectiv',
    'doctor',
    'doctorLekter',
  ];
  constructor(private dbService: DBService) {}

  submitSelect(player: Player, selectedPlayer: Player) {}
}
