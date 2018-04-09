import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { masterFirebaseConfig } from './api-keys.ts'; ENABLE WHEN FIREBASE IS ADDED
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
