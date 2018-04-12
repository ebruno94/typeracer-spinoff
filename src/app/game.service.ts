import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { BOOK } from '../book'

@Injectable()
export class GameService {

  constructor(public database: AngularFireDatabase ) { }

  allBalloonsArray: FirebaseListObservable<any>;
  activeBalloons: FirebaseListObservable<any>;
  activeGame: FirebaseObjectObservable<any>;
  currentUser: string = null;
  whichPlayer: string = null;
  isHost: boolean = true;
  book = null;
  allBalloonsArrayKey = null;
  allLocalSentences: string[] = null;
  currentTimeObservable: FirebaseObjectObservable<any>;
  currentTime: number = 60;

  setActiveGame(gameId){
    // console.log("I'm setting active game");
    // console.log("I'm setting active game to: " + gameId);
    this.activeGame = this.database.object('allGames/'+gameId);
    this.currentTimeObservable = this.database.object('allGames/'+gameId+'/time');
    this.currentTimeObservable.subscribe(time=>{
      // console.log("the received time subscription is: " + time);
      // console.log(time);
      this.currentTime = time.$value;
    })
  }

  incrementTime = ()=>{
    if (this.currentTime > 1){
      this.activeGame.update({time: this.currentTime-0.1});
      // console.log(this.currentTime/10);
      setTimeout(this.incrementTime, 100);
    }
  }

  getActiveBalloons(key){
    this.activeBalloons = this.database.list('allBalloonsArray/activeBalloons/' + key);
  }

  popBalloon(balloonKey){
    let poppedBalloon;
    this.activeBalloons.subscribe(data=>{
      // data.forEach(balloon=>{
      //   if (balloon.$key === balloonKey) {
      //     // this.activeGame[this.whichPlayer]+=balloon.score;
      //   }
      // });
    })
//    console.log("AllBalloonsArray: " + this.allBalloonsArrayKey)
//    console.log(balloonKey);
    this.activeBalloons.remove(balloonKey);
  }
  addBalloon(){
    let inputTime = this.currentTime;
    if(this.currentTime > 2){
      inputTime = this.currentTime;
    } else {
      inputTime = 0;
    }
    let newBalloon = {
      score: 0,
      content: '',
      createdTime: this.currentTime

    };
    //Pick a randomSentence from allLocalballoons
    //Change this function later on
    let randomSentence = Math.floor(Math.random()*this.allLocalSentences.length);
    //Set content to new balloon to the sentence
    //Trim whitespaces, remove escape sequences,
    newBalloon.content = this.allLocalSentences[randomSentence].replace(/[()]/g, '').replace(/\n/ig, ' ').replace(/\s+/g,' ').trim();
    //Set score = to length of balloon
    newBalloon.score = newBalloon.content.length;
    //Push new balloon to active balloon
//    console.log(newBalloon);
    this.activeBalloons.push(newBalloon);
  }
  //Used to generate allLocalSentences content for host from book selected.
  newBalloons(bookNumber){
    this.allLocalSentences = BOOK.book[bookNumber].content.match( /[^\.!\?]+[\.!\?]+/g );
    //Non intelligently. Truncate string to 180
    for(var i = 0; i < this.allLocalSentences.length; i ++){
      if(this.allLocalSentences[i].length > 180){
        this.allLocalSentences[i] = this.allLocalSentences[i].slice(0,180);
      }
    }
    // let newBalloon = {
    //   score: 0,
    //   content: ''
    // };
    //
    // //Sets the content of the new balloon
    //
    // newBalloon.content = `The quick brown fox jumps over the lazy dog`;
    //
    // newBalloon.score = newBalloon.content.length;
    // this.activeBalloons.push(newBalloon);
    // return newBalloon;
  };

  checkInput(element){
    //console.log("changing");
    let e = element;
    let input = e.value;
    let hasMatch = false;
    let completedBalloon = null;
    this.activeBalloons.subscribe(data=>{
      let balloonCount = 0;
      data.forEach(balloon=>{
        balloonCount ++;
      //  console.log(balloonCount);
        if (balloon.content.search(input) === 0) hasMatch = true;
        if (balloon.content === input) {
  //        console.log("You matched a balloon!!!!");
          completedBalloon = balloon.$key;
  //        console.log(balloon.$key);
        }
      })
    })

    if (hasMatch) {
      e.style.color = 'green';
    } else {
      e.style.color = 'red';
    }

    if (completedBalloon) {
  //    console.log("I be poppin");
      e.value = '';
      this.popBalloon(completedBalloon);
    }
  }
}
