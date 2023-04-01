import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameRoomComponent } from './gameRoom/game-room/game-room.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { StartGameComponent } from './start-game/start-game.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'waitRoom',
    component: ListUsersComponent
  },
  {
    path:'start',
    component: StartGameComponent
  },
  {
    path:'gameRoom',
    component: GameRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
