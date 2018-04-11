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

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private playerService: PlayerService, private queueService: QueueService){}

  ngOnInit(){
    this.route.params.forEach(parameter=>{
      this.uid = parameter['uid'];
      console.log("This is the playerKey from the list of route parameters: " + this.uid);
      this.playerService.setPlayer(this.uid);
    })
  }

  friends = [
    {
      name: "Ernest",
      status: "Online"
    },
    {
      name: "Justin",
      status: "Offline"
    },
    {
      name: "Alexander",
      status: "Online"
    },
    {
      name: "Jahmanz",
      status: "Online"
    },
    {
      name: "Tim",
      status: "Online"
    },
    {
      name: "Tyler",
      status: "Online"
    }
  ]

//
//   goToUserDetailPage(clickedShow) {
//     this.router.navigate(['', clicked.$key]);
//   };
}
