import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ChatComponent } from './user-panel/user-panel.component';

import { UserCreateComponent } from './user-create/user-create.component';
import { GameComponent } from './game/game.component';

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
<<<<<<< HEAD
=======
    path: 'user/display',
    component: ChatComponent
  },
  {
>>>>>>> be221f5e9d67418380cb92a194d2c826cc38e243
    path: 'game/create',
    component: GameComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
