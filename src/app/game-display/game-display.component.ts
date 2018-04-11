import { Component, OnInit, Input } from '@angular/core';
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

}
