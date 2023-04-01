import { Injectable, EventEmitter, Output} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Observable, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService  extends Socket{
  @Output() outputEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private localstorageservice: LocalStorageService
  ) { 
    super({
      url: `http://${environment.serverSocketIp}:${environment.serversocketPort}`
    });

  }
  sendNameClient =(nameClient:string)=>{
    const customer = {
      id : this.ioSocket.id,
      name:  nameClient
    }
    console.log(customer)
    this.emitEvent('customer-register', customer)
  }

  listen = (event_name:string) => {
    return new Observable((observer: Subscriber<any>) => {
      this.ioSocket.on(event_name, (data: any) => {
        observer.next(data);
      });
    });
  }

  
  emitEvent = (event = 'default',payload = {}) => {
    console.log('emitiendo');
    this.ioSocket.emit(event, payload);
}
}



