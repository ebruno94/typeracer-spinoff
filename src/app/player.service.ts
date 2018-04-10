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
      console.log("about to read players");
      //checks to see if player with this userId already exists
      data.forEach(player=>{
        console.log("reading players");
        if (player.uid === userId) {
          exists = true;
          this.currentPlayer = this.database.object('players'+player.key);
          console.log("this player already exists: " + player.uid);
        }
      });
      //if player does not already exist, create a new player
      if (!exists) {
        let newPlayer = {
          uid: userId,
          username: username,
          friends: [], //an array of friend keys
          wins: 0,
          losses: 0,
          loggedIn: true
        }
        this.players.push(newPlayer)
        .then(snap=>{
          console.log("this is your new player: " + snap.key);
          this.currentPlayer = this.database.object('players/' + snap.key);
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
