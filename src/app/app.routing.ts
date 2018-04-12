import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ChatComponent } from './chat/chat.component';

import { UserCreateComponent } from './user-create/user-create.component';
import { GameComponent } from './game/game.component';
import { GameDisplayComponent } from './game-display/game-display.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'user/create',
    component: UserCreateComponent
  },
  {
    path: 'user/display/:uid',
    component: UserPanelComponent
  },
  {
    path: 'game/create',
    component: GameComponent
  },
  {
    path: 'game/display/:gameid/:playerid',
    component: GameDisplayComponent
  },


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
