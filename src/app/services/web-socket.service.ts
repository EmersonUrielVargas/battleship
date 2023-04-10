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
    private localstorage: LocalStorageService
  ) { 
    //url: `https://${environment.serverSocketIp}:${environment.serversocketPort}`
    super({
      url: `https://${environment.serverSocketIp}`
    });

  }
  sendNameClient =(nameClient:string)=>{
    const customer = {
      id : this.ioSocket.id,
      name:  nameClient
    }
    console.log(customer)
    this.localstorage.set("userClient", customer)
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
    console.log(`Emitiendo evento '${event}' y el payload es: ${JSON.stringify(payload)}`);
    this.ioSocket.emit(event, payload);
}
}



