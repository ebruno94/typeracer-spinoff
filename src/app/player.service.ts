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
    let exists = false;
    this.players.subscribe(data=>{
      //checks to see if player with this userId already exists
      data.forEach(player=>{
        if (player.uid === userId) {
          exists = true;
          this.currentPlayer = this.database.object('players'+player.$key);
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
        this.localFriends = [];
        friends.forEach(friendKey=>{
          this.localFriends.push(this.database.object('players/'+friendKey.friendKey));
          this.localFriends[this.localFriends.length-1].subscribe(friend=>{
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
      myFirstSubscription.unsubscribe();
    })
    this.foundPotentialFriends = [];
  }

  findFriends(input: string, element){
    if (input.length >= 3){
      let potentialFriends = [];
      this.players.subscribe(players=>{
        players.forEach(player=>{
          console.log("reading player.username: " + player.username); 
          if (player.username.search(input) !== -1){
            potentialFriends.push({username: player.username, key: player.$key})
          }
        })
        this.foundPotentialFriends = potentialFriends;
      })
    }
  }

  setPlayer(key){
    this.currentPlayer = this.database.object('players/' + key);
    this.currentGameState = this.database.object('players/'+key+'/currentGame');
    this.currentPlayer.subscribe(player=>{
      console.log("This is the state: " + player.currentGame);
      console.log(player.currentGame);
      if (player.currentGame) {
        this.router.navigate(['game', 'display', player.currentGame])
      }
      this.ourGameRequests = this.database.list('players/'+key+'/requests/');
      this.getFriends();
    })
  }

  setGameIds(gameId){
    console.log("setting Game Ids");
    let currentGame = this.database.object('allGames/'+gameId);
    currentGame.subscribe(game=>{
      let player1Id = game.player1;
      let player2Id = game.player2;
      console.log(game);
      console.log("player1Id: " + player1Id);
      let player1 = this.database.object('players/'+player1Id);
      let player2 = this.database.object('players/'+player2Id);
      player1.update({currentGame: gameId});
      console.log("trying to update gameIds");
      player2.update({currentGame: gameId});
    })
  }

  logoutPlayer(){
    this.currentPlayer.update({loggedIn: false});
  }
}
