import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from './auth.service'

import { routing } from './app.routing';


import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ChatComponent } from './chat/chat.component';
import { GameComponent } from './game/game.component';
import { AdminComponent } from './admin/admin.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { SettingsComponent } from './settings/settings.component'


export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  sotrageBucket: masterFirebaseConfig.storageBucket
};

// export const firebaseChatConfig = {
//   apiKey: masterFirebaseChatConfig.apiKey,
//   authDomain: masterFirebaseChatConfig.authDomain,
//   databaseURL: masterFirebaseChatConfig.databaseURL,
//   projectId: masterFirebaseChatConfig.projectId,
//   storageBucket: masterFirebaseChatConfig.storageBucket,
//   messagingSenderId: masterFirebaseChatConfig.messagingSenderId
// };

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    UserPanelComponent,
    GameComponent,
    AdminComponent,
    ChatComponent,
    UserCreateComponent,
    GameCreateComponent,
    GameDisplayComponent,
    UserCreateComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireModule.initializeApp(firebaseChatConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
