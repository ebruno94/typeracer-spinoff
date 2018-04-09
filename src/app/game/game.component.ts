import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService]
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(){
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



}
