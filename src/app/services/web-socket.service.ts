import { Injectable, EventEmitter, Output} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService  extends Socket{
  @Output() outputEvent = new EventEmitter<string>();
  private ws!: WebSocket;

  constructor(
    private localstorageservice: LocalStorageService
  ) { 
    super({
      url: `http://${environment.serverSocketIp}:${environment.serversocketPort}`,
      options:{
        query: {
          gameId: localstorageservice.get('gameId')
        }
      }
    });
  }

  connectToServer() {
    this.ws = new WebSocket(`ws://${environment.serverSocketIp}:${environment.serversocketPort}`);
    this.ws.onopen = (event) => {
      console.log('Connected to server');
    };
    this.ws.onmessage = (event) => {
      console.log('Received message from server:', event.data);
      this.outputEvent.emit(event.data)
    };
    this.ws.onerror = (event) => {
      console.log('Error connecting to server:', event);
    };
    this.ws.onclose = (event) => {
      console.log('Disconnected from server');
    };
  }

  getSocket() {
    return this.ws;
  }

  sendMessage(message: string) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.log('WebSocket is not open');
    }
  }
}



