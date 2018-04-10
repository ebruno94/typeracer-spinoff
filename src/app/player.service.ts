import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class PlayerService {

  players: FirebaseListObservable<any>;
  currentPlayer: FirebaseObjectObservable<any>;
  friends: FirebaseObjectObservable<any>[] = [];

  constructor(private database: AngularFireDatabase) {
    this.players = this.database.list('players');
  }

  loginPlayer(userId: string, username: string){
    let exists = false;
    this.players.subscribe(data=>{
      //checks to see if player with this userId already exists
      data.forEach(player=>{
        if (player.uid === userId) {
          exists = true;
          this.currentPlayer = player;
        }
      });
      //if player does not already exist, create a new player
      if (!exists) {
        let newPlayer = {
          userId: userId,
          username: username,
          friends: [], //an array of friend keys
          wins: 0,
          losses: 0,
          loggedIn: true
        }
        data.push(newPlayer)
        .then(snap=>{
          this.currentPlayer = snap;
        });
      }
    });
  }

  getFriends(){
    this.currentPlayer.subscribe(player=>{
      let friendCount = 0;
      player.friends.forEach(friendKey=>{
        this.friends[friendCount] = this.database.object('players/' + friendKey);
        friendCount ++;
      });
    })
  }

  logoutPlayer(){
    this.currentPlayer.update({loggedIn: false}); 
  }
}
