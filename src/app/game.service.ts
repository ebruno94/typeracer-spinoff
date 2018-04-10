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

  getActiveBalloons(key){
    this.activeBalloons = this.database.list('allBalloonsArray/activeBalloons/' + key);
  }

  popBalloon(balloonKey){
    let poppedBalloon;
    this.activeBalloons.subscribe(data=>{
      data.forEach(balloon=>{
        if (balloon.$key === balloonKey) {
          // this.activeGame[this.whichPlayer]+=balloon.score;
        }
      });
    })
    console.log("AllBalloonsArray: " + this.allBalloonsArrayKey)
    console.log(balloonKey);
    this.activeBalloons.remove(balloonKey);
  }

  addBalloon(){
    let newBalloon = {
      score: 0,
      content: ''
    };

    //Sets the content of the new balloon

    newBalloon.content = (function(){

      //Picks a random starting character within the chontent of the book

      let randomIndex = Math.floor(Math.random()*BOOK.book[0].content.length);
      let punctuation = /[!?.]/;
      if (punctuation.test(BOOK.book[0].content[randomIndex])){
        randomIndex += 1;
      }

      //Iterates backwards from random character to find first punctuation. Sets this index as starting point of returned string

      let startingIndex = (function(){
        let i;
        for (i = randomIndex; !punctuation.test(BOOK.book[0].content[i]); i--){}
        return i+1;
      })();

      //Iterates forwards from random character to find first punctuation. Sets this index as starting point of returned string

      let endingIndex = (function(){
        let i;
        for (i = randomIndex; !punctuation.test(BOOK.book[0].content[i]); i++){}
        return i;
      })();

      return BOOK.book[0].content.slice(startingIndex+1, endingIndex);

    })();

    newBalloon.score = newBalloon.content.length;
    this.activeBalloons.push(newBalloon);
  };

  checkInput(element){
    console.log("changing");
    let e = element;
    let input = e.value;
    let hasMatch = false;
    let completedBalloon = null;
    this.activeBalloons.subscribe(data=>{
      data.forEach(balloon=>{
      console.log(balloon.content.search(input));
      if (balloon.content.search(input) === 0) hasMatch = true;
      if (balloon.content === input) {
        console.log("You matched a balloon!!!!");
        completedBalloon = balloon.$key;
        console.log(balloon.$key);
      }
    })
  })

    if (hasMatch) {
      e.style.color = 'green';
    } else {
      e.style.color = 'red';
    }

    if (completedBalloon) {
      console.log("I be poppin");
      this.popBalloon(completedBalloon);
    }
  }
}
