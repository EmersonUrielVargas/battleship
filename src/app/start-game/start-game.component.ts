import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { InputCustomComponent } from '../input-custom/input-custom.component';
import { SocketService } from '../services/web-socket.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {
  @ViewChild('appInputCustom') inputCustom!: InputCustomComponent;
  subscriptionNoValid: Subscription = new Subscription();
  @Input() gameCode = "";
  isAccessBlock=false;
  
  //va en parametros del contrsuctor private socketService: SocketService,
  constructor(
    private socketService: SocketService,
    private localstorage: LocalStorageService,
    private cdRef: ChangeDetectorRef,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.subscriptionNoValid = this.socketService.listen('no-access').subscribe((data) => {
      console.log(data)
      this.isAccessBlock = true;
      this.cdRef.detectChanges();
    });

  }

  GoToHome(){
    this.router.navigate(['']);
    this.localstorage.clear();
  }

  startGame(): void{
    this.socketService.sendNameClient(this.inputCustom.getValue);
    this.router.navigate(['waitRoom']);
  }
}
