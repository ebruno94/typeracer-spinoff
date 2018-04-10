import { Component, OnInit } from '@angular/core';
// import { User } from '../user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-userpanel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})

export class UserPanelComponent implements OnInit {
  shows: FirebaseListObservable<any[]>;
  currentRoute: string = this.router.url;

  constructor(private router: Router){}

  ngOnInit(){

  // this. = this.showService.get();

  }

  startGame(){
    this.router.navigate(['game', 'create']);
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
