import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QueueService } from '../queue.service';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css'],
  providers: [ QueueService ]
})
export class GameCreateComponent implements OnInit {

  @Output() triggerStartGame = new EventEmitter();
  queueTimer: number = 0;

  constructor(private queueService: QueueService) { }

  ngOnInit() {
  }

  startQueue(){
    this.queueService.createNewGame('....');

    this.queueTimer = 30;

    let incrementTime = ()=>{
      if (this.queueTimer !== 0){
        this.queueTimer -= 1;
        if (this.queueService.myGame){
          this.queueService.myGame.subscribe(data=>{
            console.log(data);
            if (data.player2) this.startGame();
          })
        }
        setTimeout(incrementTime, 1000);
      }
    }

    setTimeout(()=>{
      // myGameSubscription.unsubscribe();
    }, 30000)

    setTimeout(incrementTime, 1000);
  }

  startGame(){
    this.triggerStartGame.emit(this.queueService.myGame);
  }

  addPlayer2(player2Key){
    this.queueService.myGame.subscribe(data=>{
      data.player2=player2Key;
    })
  }

}
