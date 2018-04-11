import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import {ViewChild, Input} from "@angular/core";
import { PlayerService } from '../player.service';

// class Balloon {
//   score: number;
//   key: string;
//   content: string;
//   lifetime: number;
// }

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css'],
  providers: [GameService, PlayerService]
})
export class GameDisplayComponent implements OnInit {

  @Input() currentGame;
  @ViewChild("myCanvas") myCanvas;
  balloonLocationArr: Array<Object> = [];
  context:CanvasRenderingContext2D;
  constructor(private gameService: GameService) { }

  ngOnInit(){
      // console.log("I'm initializing!!!");
      this.gameService.allBalloonsArray = this.gameService.database.list('allBalloonsArray');
      this.gameService.allBalloonsArray.subscribe(data=>{
        if (this.gameService.isHost && !this.gameService.activeBalloons)        this.gameService.allBalloonsArray.push([])
        .then(data=>{
          // console.log("allBalloonsArray key: " + data.key);
          this.gameService.allBalloonsArrayKey = data.key;
          this.gameService.getActiveBalloons(data.key);
          this.gameService.activeBalloons.subscribe(snap=>{
            // console.log(snap);
            // console.log("activeBalloons key: " + snap.key);
            // console.log("about to add balloons");
            if (snap.length < 5 && this.gameService.isHost) {
              let newBalloon = this.gameService.addBalloon();
            //  console.log(newBalloon);
              this.balloonLocationArr[this.balloonLocationArr.length] = newBalloon;
             console.log(this.balloonLocationArr);
            }

          });
        });
      });
      this.createCanvas();
    }
  drawBalloon(c, balloon, i, w, h, t){
    c.fillStyle = "#ffffff"
    c.beginPath();
    c.arc(w/10 + w/5*i,h-(w/10)-(t/balloon.lifetime*(h-w/5)),(w/10)-10,0,2*Math.PI);
    // c.arc(150+300*i,650,140,0,2*Math.PI);
    c.stroke();
    c.closePath();
    c.fill();
    c.fillStyle = "#000000"
    c.font = (w/100).toString()+'px Courier';
    c.textAlign = 'center';
    this.generateBalloonText(c, balloon, i, w, h,t);
  }

  generateAllBalloons(c){
    let t=0;
    setTimeout(()=>{
      console.log("ENTERED TIMEOUT 1");
      if(this.balloonLocationArr.length===5){
        console.log("ENTERED TIMEOUT");
        c.clearRect(0, 0, 1500, 800);

        this.drawBalloon(c, this.balloonLocationArr[0], 0, 1500, 800, t/100);
        this.drawBalloon(c, this.balloonLocationArr[1], 1, 1500, 800, t/100);
        this.drawBalloon(c, this.balloonLocationArr[2], 2, 1500, 800, t/100);
        this.drawBalloon(c, this.balloonLocationArr[3], 3, 1500, 800, t/100);
        this.drawBalloon(c, this.balloonLocationArr[4], 4, 1500, 800, t/100);
        // if(i<9){i++};
        t++;
        }
      }, 5000);

  }

  generateBalloonText(c, balloon, i, w, h, t){
    let contentLength = balloon.content.length;
    if(contentLength > 180){
      console.log("content too long");
      return false;
    }
    let totalLines = Math.ceil(contentLength/20);
    let firstIndex = 0;
    let lastIndex = 20;
    for(let j = -((totalLines-1)/2); j <= ((totalLines-1)/2); j ++){
      c.fillText(balloon.content.slice(firstIndex, lastIndex),w/10 + w/5*i,h-(w/10)+(w/200)+ j*(w/75) -(t/balloon.lifetime*(h-w/5)));
      firstIndex += 20;
      lastIndex = Math.min(lastIndex+20, balloon.content.length)
    }

  }
  createCanvas(){
    var canvas = this.myCanvas.nativeElement;
    var c = canvas.getContext("2d");
    this.generateAllBalloons(c);
  }

}
