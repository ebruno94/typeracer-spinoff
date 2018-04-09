import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { BOOK } from '../book'

@Injectable()
export class GameService implements OnInit {

  constructor(private database: AngularFireDatabase ) { }

  activeBalloons: FirebaseListObservable<any>;
  activeGame: FirebaseObjectObservable<any>;
  currentUser: string = null;
  whichPlayer: string = null;
  isHost: boolean = false;
  book = null;

  ngOnInit(){
    this.activeBalloons.subscribe(data=>{
      if (data.length < 5 && this.isHost) this.addBalloon();
    });
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

      return BOOK.book[0].content.slice(startingIndex, endingIndex);

    })();

    newBalloon.score = newBalloon.content.length;
    this.activeBalloons.push(newBalloon);
  };

  checkInput(input){
    let myStyle = {};
    let hasMatch = false;
    let completedBalloon = null;
    this.activeBalloons.forEach(balloon=>{
      if (balloon.content.search(input) === 0) hasMatch = true;
      if (balloon.content === input) completedBalloon = balloon.$key;
    })

    if (hasMatch) {
      myStyle['color'] = 'green';
    } else {
      myStyle['color'] = 'red';
    }

    if (completedBalloon) {
      this.popBalloon(completedBalloon);
    }
    return myStyle;
  }
}
