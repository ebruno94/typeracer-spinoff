import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GameService } from '../game.service';
import { PlayerService } from '../player.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  currentTime: number = 60;

  constructor(private gameService: GameService, private playerService: PlayerService, private route: ActivatedRoute, private router: Router) { }

  currentGameId;

  ngOnInit(){

    this.route.params.forEach(parameter=>{
      this.currentGameId = parameter['gameid'];
      console.log(this.currentGameId);
    })

    this.playerService.setGameIds(this.currentGameId);

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
            console.log(this.gameService.activeBalloons);
          }
        });
      });
    });
  }
  drawBalloon(c, balloon, i, w, h, t){
    c.fillStyle = "#ffffff"
    c.beginPath();
    c.arc(w/10 + w/5*i,h-(w/10)-(t/balloon.createdTime*(h-w/5)),(w/10)-10,0,2*Math.PI);
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
    setInterval(()=>{
      if(this.balloonLocationArr.length===5){

        c.clearRect(0, 0, 1500, 800);
        this.drawBalloon(c, this.balloonLocationArr[0], 0, 1500, 800, this.currentTime);
        this.drawBalloon(c, this.balloonLocationArr[1], 1, 1500, 800, this.currentTime);
        this.drawBalloon(c, this.balloonLocationArr[2], 2, 1500, 800, this.currentTime);
        this.drawBalloon(c, this.balloonLocationArr[3], 3, 1500, 800, this.currentTime);
        this.drawBalloon(c, this.balloonLocationArr[4], 4, 1500, 800, this.currentTime);
        // if(i<9){i++};

        }
      }, 50);

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
      c.fillText(balloon.content.slice(firstIndex, lastIndex),w/10 + w/5*i,h-(w/10)+(w/200)+ j*(w/75) -(t/balloon.createdTime*(h-w/5)));
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
