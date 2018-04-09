import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class GameService implements OnInit {

  constructor(private database: AngularFireDatabase ) { }

  activeBalloons: FirebaseListObservable<any>;
  activeGame: FirebaseObjectObservable<any>;
  currentUser: string = null;
  whichPlayer: string = null;
  isHost: boolean = false;

  ngOnInit(){
    this.activeBalloons.subscribe(data=>{
      if (data.length < 5 && this.isHost) this.addBalloon();
    })
  }

  popBalloon(balloonKey){
    let poppedBalloon;
    this.activeBalloons.forEach(balloon=>{
      if (balloon.$key === balloonKey) {
        this.activeGame[this.whichPlayer]+=balloon.score;
      }
    })
    this.activeBalloons.remove('balloons/' + this.activeBalloons.$key + '/balloon/' + balloonKey);
  }

  addBalloon(){};

}
