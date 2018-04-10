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
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';
  roomNumber = Math.ceil(Math.random() * 1000000);
  editMode: boolean = false;


  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = af.list('/chatrooms/'+ this.roomNumber, {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.afAuth.authState;

  }

  ngOnInit(){

  }

  setRoomNumber(num){
    this.roomNumber = num;
    this.editMode = !this.editMode;
    this.loadChat();
  }

  loadChat(){
    this.items = this.af.list('/chatrooms/'+ this.roomNumber, {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.afAuth.authState;

  }

  clickEditMode(){
    this.editMode = !this.editMode;
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
    this.updateScroll();
  }

  updateScroll(){
    let element = document.getElementById("details-container");
    element.scrollTop = element.scrollHeight;
  }
}
