import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'
import { UserPanelComponent } from './user-panel/user-panel.component'
import { GameComponent } from './game/game.component'

const appRoutes: Routes = [
  {
    path: '',
    component: GameComponent
  },
  {
    path: 'user/display',
    component: UserPanelComponent
  },
  {
    path: 'Game/display',
    component: GameComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
