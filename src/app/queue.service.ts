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

  cleanGames(){
    this.allGames.subscribe(allGames=>{
      allGames.forEach(game=>{
        if (Date.now()-game.timeCreated > 90000){
          console.log("cleaning games");
          console.log("this is player1 game" + game.player1);
          let player1 = this.database.object('players/'+game.player1);
          let player2 = this.database.object('players/'+game.player2);
          player1.update({currentGame: -1});
          player2.update({currentGame: -1});
          this.database.object('allGames/'+game.$key).remove();
        }
      })
    })
  }

  initiateNewGame(request, playerId){
    let myPlayer2 = (playerId === request.requestor) ? request.requestee : request.requestor;
    let myNewGame = {
      player1: playerId, //**Fill with current player ID
      player2: myPlayer2,
      balloonsArrayKey: null,
      player1Score: 0,
      player2Score: 0,
      time: 60,
      timeCreated: Date.now()
    }
    this.allGames.push(myNewGame)
    .then(snap=>{
      this.router.navigate(['game', 'display', snap.key, playerId])
    })
  }

  iterateRequestTimers(){
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

    this.ourRequests = this.database.list('players/'+playerKey+'/requests/');
    setTimeout(this.iterateRequestTimers, 1000);
    let secondSubscription = this.ourRequests.subscribe(me=>{
      this.ourRequests.push({"requestor": playerKey, "requestee": opponentKey, requestTime: 30});
      secondSubscription.unsubscribe();
    })
  }
}
