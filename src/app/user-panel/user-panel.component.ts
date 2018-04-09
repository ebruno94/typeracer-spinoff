import { Component, OnInit } from '@angular/core';
// import { User } from '../user.model';

import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-userpanel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  providers: []
})

export class UserPanelComponent implements OnInit {
  shows: FirebaseListObservable<any[]>;
  currentRoute: string = this.router.url;

  constructor(private router: Router, private userService: UserService){}

  ngOnInit(){

  // this. = this.showService.get();

}
//
//   goToUserDetailPage(clickedShow) {
//     this.router.navigate(['', clicked.$key]);
//   };
}
