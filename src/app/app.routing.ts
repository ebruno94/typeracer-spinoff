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
    path: 'user/display',
    component: ChatComponent
=======
    path: 'game/create',
    component: GameComponent
>>>>>>> 39b2d4b60c1e18fa5b9e8bb45a2336b3f3aaea7a
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
