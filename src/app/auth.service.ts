import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.user.subscribe(data=>{
          console.log("This is the current user's uid: " + data.uid);
        })
        console.log('Success!', value);
        return true;
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        return false; 
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log(value);
        console.log('Nice, it worked!');
        return true;
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        return false;
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
