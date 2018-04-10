import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class QueueService {

  allGames: FirebaseListObservable<any>;
  myGame: FirebaseObjectObservable<any>;
  queueTimer: number = 0;
  activeGame: boolean = false;

  constructor(private database: AngularFireDatabase) {
    this.allGames = this.database.list('allGames');
  }

  createNewGame(playerKey){
    let myNewGame = {
      player1: playerKey, //**Fill with current player ID
      player2: null,
      balloonsArrayKey: null,
      player1Score: 0,
      player2Score: 0,
      time: 60
    }
    this.allGames.push(myNewGame)
    .then(snap=>{
      this.myGame = this.database.object('allGames/'+snap.key);
    })
  }

}
