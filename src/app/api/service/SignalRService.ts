import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public messageReceived$ = new Subject<string>();

  constructor() { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://your-signalr-server-url/chathub') // Adjust the URL accordingly
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messageReceived$.next(message);
    });
  }

  public sendMessageToUser = (userId: string, message: string) => {
    this.hubConnection.invoke('SendMessageToUser', userId, message)
      .catch(err => console.error(err));
  }
}