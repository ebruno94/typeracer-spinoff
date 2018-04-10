import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
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
    path: 'user/display',
    component: UserPanelComponent
  },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
