import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { masterFirebaseConfig } from './api-keys.ts'; ENABLE WHEN FIREBASE IS ADDED
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { routing } from './app.routing';


import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { GameComponent } from './game/game.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    UserPanelComponent,
    GameComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
