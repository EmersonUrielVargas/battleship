import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/web-socket.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  subscriptionHost: Subscription = new Subscription(); 
  subscriptionStartGame: Subscription = new Subscription();
  isHost : boolean = false;

  constructor(
    private socketService: SocketService,
    private router: Router,
    private localStorage : LocalStorageService
    ) { 
    }

  ngOnInit(): void {
    

    this.subscriptionHost = this.socketService.listen('send-host').subscribe((data) => {
      this.isHost = (data.id.includes(this.socketService.ioSocket.id));
    });

    this.subscriptionStartGame = this.socketService.listen('send-my-board').subscribe((data) => {
      this.localStorage.set("myboard", data);
      console.log('Barcos recibidos')
      this.router.navigate(['gameRoom']);
    });

  }

  ngOnDestroy() {
    this.subscriptionHost.unsubscribe();
  }

  startBattle(){
    this.socketService.emitEvent('start-game', true);
  }

}
