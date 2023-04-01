import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InputCustomComponent } from '../input-custom/input-custom.component';
import { SocketService } from '../services/web-socket.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  @ViewChild('appInputCustom') inputCustom!: InputCustomComponent;
  @Input() gameCode = "";
  
  //va en parametros del contrsuctor private socketService: SocketService,
  constructor(
    private socketService: SocketService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  startGame(): void{
    this.socketService.sendNameClient(this.inputCustom.getValue);
    this.router.navigate(['waitRoom']);
  }
}
