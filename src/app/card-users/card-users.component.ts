import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/web-socket.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.css']
})
export class CardUsersComponent implements OnInit {
  users: any[] = [{name:"emerson"}, {name:"manuel"}, {name:"William"}, {name:"cristhian"}];
  subscriptionCustomers: Subscription = new Subscription(); 
  isHost : boolean = false;

  constructor(
    private socketService: SocketService,
    private localStorage : LocalStorageService
    ) { }

  ngOnInit(): void {
    this.subscriptionCustomers = this.socketService.listen('send-customers').subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy() {
    this.subscriptionCustomers.unsubscribe();
  }

}
