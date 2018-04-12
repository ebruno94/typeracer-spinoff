import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';


@Injectable()
export class QueueService {

  allGames: FirebaseListObservable<any>;
  myGame: FirebaseObjectObservable<any>;
  queueTimer: number = 0;
  activeGame: boolean = false;
  prospectiveOpponentRequests: FirebaseListObservable<any>;
  ourRequests: FirebaseListObservable<any>;

  constructor(private database: AngularFireDatabase, private router: Router) {
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

  initiateNewGame(request){
    let myNewGame = {
      player1: request.requestor, //**Fill with current player ID
      player2: request.requestee,
      balloonsArrayKey: null,
      player1Score: 0,
      player2Score: 0,
      time: 60
    }
    this.allGames.push(myNewGame)
    .then(snap=>{
      console.log("This is your game key: " + snap.key);
      this.router.navigate(['game', 'display', snap.key])
    })
  }

  iterateRequestTimers(){
    console.log("iterating timer");
    this.ourRequests.forEach(request=>{
      let thisSubscription = request.subscribe(request=>{
        let currentTime = request.requestTime;
        request.update({requestTime: currentTime-1})
        thisSubscription.unsubscribe();
      })
    })
  }

  requestGame(playerKey, opponentKey){
    this.prospectiveOpponentRequests = this.database.list('players/'+opponentKey+'/requests');
    let firstSubscription = this.prospectiveOpponentRequests.subscribe(opponent=>{
      this.prospectiveOpponentRequests.push({requestor: playerKey, requestee: opponentKey, requestTime: 30});
      firstSubscription.unsubscribe();
    })
    
    console.log("about to add request to my queue");
    this.ourRequests = this.database.list('players/'+playerKey+'/requests/');
    setTimeout(this.iterateRequestTimers, 1000);
    let secondSubscription = this.ourRequests.subscribe(me=>{
      this.ourRequests.push({"requestor": playerKey, "requestee": opponentKey, requestTime: 30});
      secondSubscription.unsubscribe();
    })
  }
}
