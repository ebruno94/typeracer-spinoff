import { Component, OnInit } from '@angular/core';
// import { User } from '../user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-userpanel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
})

export class UserPanelComponent implements OnInit {
  user: FirebaseListObservable<any[]>;
  currentRoute: string = this.router.url;

  constructor(private router: Router){}

  ngOnInit(){

  // this. = this.showService.get();

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

@Component({
  selector: 'app-userpanel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']

})

export class ChatComponent {

  user: Observable<firebase.User>;
    items: FirebaseListObservable<any[]>;
    msgVal: string = '';

    constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
      this.items = af.list('/messages', {
        query: {
          limitToLast: 50
        }
      });

      this.user = this.afAuth.authState;

    }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
      this.afAuth.auth.signOut();
  }

  Send(desc: string) {
      this.items.push({ message: desc});
      this.msgVal = '';
  }
}
