import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { StartGameComponent } from './start-game/start-game.component';
import { InputCustomComponent } from './input-custom/input-custom.component';
import { GameRoomComponent } from './gameRoom/game-room/game-room.component';
import { CellBlockComponent } from './gameRoom/cell-block/cell-block.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CardUsersComponent } from './card-users/card-users.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    CardComponent,
    HomeComponent,
    StartGameComponent,
    InputCustomComponent,
    GameRoomComponent,
    CellBlockComponent,
    ListUsersComponent,
    CardUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
