import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import {ViewChild, Input} from "@angular/core";


interface Balloon {
  key: string,
  text: string,
  velocity: number,
}

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css'],
  providers: [ GameService ]
})

export class GameDisplayComponent implements OnInit {
  @Input() currentGame;
  @ViewChild("myCanvas") myCanvas;
  context:CanvasRenderingContext2D;
  constructor(private gameService: GameService) { }

  balloonLocationArr:Balloon[] = [];

  ngOnInit(){
    let i = 0;
    // console.log("I'm initializing!!!");
    this.gameService.allBalloonsArray = this.gameService.database.list('allBalloonsArray');
    this.gameService.allBalloonsArray.subscribe(data=>{
      if (this.gameService.isHost && !this.gameService.activeBalloons)
      this.gameService.allBalloonsArray.push([])
      .then(data=>{
        // console.log("allBalloonsArray key: " + data.key);
        this.gameService.allBalloonsArrayKey = data.key;
        this.gameService.getActiveBalloons(data.key);
        this.gameService.activeBalloons.subscribe(snap=>{
          // console.log(snap);
          // console.log("activeBalloons key: " + snap.key);
          // console.log("about to add balloons");
          if (snap.length < 5 && this.gameService.isHost) {
            this.balloonLocationArr = [];
            snap.forEach(balloon=>{
              console.log (balloon);
              let newBalloon = {key:'',text:'',velocity:1};
              newBalloon.key = balloon.key;
              newBalloon.text = balloon.content;
              newBalloon.velocity = 1;
              this.balloonLocationArr.push(newBalloon);
              console.log(this.balloonLocationArr, "BALLOON ARRAY first")

              /*
              balloon(
                key: balloon.number,
                text: balloon.content,
                velocity: 1
              )
              */
            })
            this.gameService.addBalloon();
            // let x = snap.length;
            //TODO Fix connection to balloons
          }
        });
      });
    });
      console.log(this.balloonLocationArr, "BALLOON ARRAY")
      this.balloonLocationArr.forEach((balloon, i)=>{
        console.log(balloon, "BALLOONS");
        this.drawBalloon(balloon.text, i);
      })
        // drawBalloon(("test"), i));
      }
  drawAll(/*Array of balloons*/) {

  }

<<<<<<< HEAD
  tester(bookNumber){
    this.gameService.newBalloons(bookNumber);
    this.gameService.addBalloon();
  }

=======
  moveBalloon(balloon) {

  }
  drawBalloon(balloon,i){
    console.log("drawing a balloon "+i)
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    let c = this.context;
    c.beginPath();
    c.arc(150+300*i,650,140,0,2*Math.PI);
    c.stroke();
    c.font = '20px Arial';
    c.textAlign = 'center';
	  c.fillText("test",150+300*i,650);
  }
>>>>>>> 243197c6a7fceefece4254c78337a2f1eae07ed8
}
