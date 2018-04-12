import { Component, OnInit } from '@angular/core';
// import { User } from '../user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service';

import { Location } from '@angular/common';

import { PlayerService } from './../player.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { QueueService } from '../queue.service'

@Component({
  selector: 'app-userpanel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  providers: [ PlayerService, QueueService ]
})

export class UserPanelComponent implements OnInit {
  user: FirebaseListObservable<any[]>;
  currentRoute: string = this.router.url;
  uid: string;
  allGames: FirebaseListObservable<any[]>;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private playerService: PlayerService, private queueService: QueueService){}

  ngOnInit(){
    this.queueService.cleanGames();
    this.route.params.forEach(parameter=>{
      this.uid = parameter['uid'];
      console.log("This is the playerKey from the list of route parameters: " + this.uid);
      this.playerService.setPlayer(this.uid);
      this.playerService.currentGameState.subscribe(state=>{
        console.log("This is the state: " + state);
        console.log(state.$value);
        console.log(state.$value !== -1);
        if (state.$value !== -1) {
          console.log("My state value is:" + state.$value)
          this.router.navigate(['game', 'display', state.$value]);
        }
      })
    })
  }

  initiateNewGame(request){
    this.queueService.initiateNewGame(request);
  }

//
//   goToUserDetailPage(clickedShow) {
//     this.router.navigate(['', clicked.$key]);
//   };
}
