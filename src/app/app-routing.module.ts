import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StartGameComponent } from './start-game/start-game.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'join',
    component: HomeComponent
  },
  {
    path:'start',
    component: StartGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
