import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  subscriptionCustomers: Subscription = new Subscription(); 
  subscriptionHost: Subscription = new Subscription(); 
  isHost : boolean = false;

  constructor(
    private socketService: SocketService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.subscriptionCustomers = this.socketService.listen('send-customers').subscribe((data) => {
      console.log('usuarios conectados')
      console.log(data)
      this.users = data;
    });


    this.subscriptionHost = this.socketService.listen('send-host').subscribe((data) => {
      console.log('usuario host actual')
      console.log(data)
      console.log('id reportado')
      console.log(this.socketService.ioSocket.id)
      this.isHost = (data.id.includes(this.socketService.ioSocket.id));
    });
  }

  ngOnDestroy() {
    this.subscriptionCustomers.unsubscribe();
    this.subscriptionHost.unsubscribe();
  }

  startBattle(){
    this.router.navigate(['gameRoom']);
  }

}
