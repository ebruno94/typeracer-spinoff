import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
@Injectable()
export class PlayerService {

  players: FirebaseListObservable<any>;
  currentPlayer: FirebaseObjectObservable<any>;
  friends: FirebaseListObservable<any>;
  localFriends = [];
  foundPotentialFriends = [];
  ourGameRequests: FirebaseListObservable<any>;
  currentGameState: FirebaseObjectObservable<any>;

  constructor(private database: AngularFireDatabase, private router: Router) {
    this.players = this.database.list('players');
  }

  loginPlayer(userId: string, username: string){
    console.log("you are trying to give player the following username: " + username);
    let exists = false;
    this.players.subscribe(data=>{
      //checks to see if player with this userId already exists
      data.forEach(player=>{
        if (player.uid === userId) {
          exists = true;
          console.log(player);
          this.currentPlayer = this.database.object('players'+player.$key);
          console.log("player key is the following: " + player.$key);
          this.router.navigate(['user', 'display', player.$key]);
        }
      });
      //if player does not already exist, create a new player
      if (!exists) {
        let newPlayer = {
          uid: userId,
          username: username,
          currentGame: null,
          friends: ['-L9pvPqJsuCRjNvbPf-g'], //an array of friend keys
          wins: 0,
          losses: 0,
          loggedIn: true
        }
        this.players.push(newPlayer)
        .then(snap=>{
          console.log(snap);
          console.log("this is your new player: " + snap.key);
          this.currentPlayer = this.database.object('players/' + snap.key);
          this.router.navigate(['user', 'display', snap.key]);
        });
      }
    });
  }

  getFriends(){
    this.currentPlayer.subscribe(player=>{
      this.friends = this.database.list('players/'+player.$key+'/friends');
      this.friends.subscribe(friends=>{
        console.log("I just subscribed to player's friends");
        this.localFriends = [];
        friends.forEach(friendKey=>{
          console.log("I'm iterating over friends");
          console.log("I'm searching for the following friend: " + friendKey.friendKey);
          this.localFriends.push(this.database.object('players/'+friendKey.friendKey));
          this.localFriends[this.localFriends.length-1].subscribe(friend=>{
            console.log("This is your friend");
            console.log(friend);
          })
          console.log(this.localFriends);
        });
      })
    })
  }

  addFriend(friendKey){
    let myFirstSubscription = this.currentPlayer.subscribe(player => {
      let myFriends = this.database.list('players/'+player.$key+'/friends');
      myFriends.push({"friendKey": friendKey});
      console.log(this.foundPotentialFriends);
      myFirstSubscription.unsubscribe();
    })
    this.foundPotentialFriends = [];
  }

  findFriends(input: string, element){
    if (input.length >= 3){
      console.log("this is the input we're trying to pull across" + input);
      console.log("about to look for friends");
      let potentialFriends = [];
      this.players.subscribe(players=>{
        players.forEach(player=>{
          console.log(player);
          console.log("you may like" + player.username);
          if (player.username.search(input) !== -1){
            potentialFriends.push({username: player.username, key: player.$key})
          }
        })
        this.foundPotentialFriends = potentialFriends;
      })
    } else {
      element.empty();
    }
  }

  setPlayer(key){
    this.currentPlayer = this.database.object('players/' + key);
    this.currentGameState = this.database.object('players/'+key+'/currentGame');
    this.currentPlayer.subscribe(player=>{
      this.ourGameRequests = this.database.list('players/'+key+'/requests/');
      this.getFriends();
    })
    this.currentGameState.subscribe(state=>{
      console.log("This is the state: " + state); 
      if (state) {
        this.router.navigate(['game', 'display', state])
      }
    })
  }

  setGameIds(gameId){
    let currentGame = this.database.object('allGames/'+gameId);
    currentGame.subscribe(game=>{
      let player1Id = game.requestor;
      let player2Id = game.requestee;
      let player1 = this.database.object('players/'+player1Id);
      let player2 = this.database.object('players/'+player2Id);
      player1.update({currentGame: gameId});
      player2.update({currentGame: gameId});
    })
  }

  logoutPlayer(){
    this.currentPlayer.update({loggedIn: false});
  }
}
