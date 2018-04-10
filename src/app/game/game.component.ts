import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  gameIsActive: boolean = false;
  currentGame: FirebaseObjectObservable<any>;

  constructor() { }

  startGame(myGame: FirebaseObjectObservable<any>){
    this.gameIsActive = true;
    this.currentGame = myGame; 
  }

}
