import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import {ViewChild} from "@angular/core";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService]
})
export class GameComponent implements OnInit {
  @ViewChild("myCanvas") myCanvas;
  context:CanvasRenderingContext2D;
  constructor(private gameService: GameService) { }

  ngOnInit(){
    let i = 0;
    console.log("I'm initializing!!!");
    this.gameService.allBalloonsArray = this.gameService.database.list('allBalloonsArray');
    this.gameService.allBalloonsArray.subscribe(data=>{
      if (this.gameService.isHost && !this.gameService.activeBalloons)        this.gameService.allBalloonsArray.push([])
      .then(data=>{
        console.log("allBalloonsArray key: " + data.key);
        this.gameService.allBalloonsArrayKey = data.key;
        this.gameService.getActiveBalloons(data.key);
        this.gameService.activeBalloons.subscribe(snap=>{
          console.log(snap);
          console.log("activeBalloons key: " + snap.key);
          console.log("about to add balloons");
          if (snap.length < 5 && this.gameService.isHost) {
            this.gameService.addBalloon();
            console.log(snap, "This is snap");
            console.log(this.gameService.activeBalloons, "This is activeBalloons");
            // let x = snap.length;
            // this.drawBalloon(snap[x].content, i);
            i++;
          }
        });
      });
    });
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
	  c.fillText(balloon,150+300*i,650);
  }



}
