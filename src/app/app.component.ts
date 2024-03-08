import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BackgroundService } from './api/service/backgroundService';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from '../../node_modules/@microsoft/signalr'
import { AppService } from './api/service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isAlertPresent: boolean = false;
  title = 'SignalRClient';
  private hubConnectionBuilder!: HubConnection;
  offers: any[] = [];
  businessLocationId: any;
  sourceId: any;
  showHeader: any = true;

  constructor(private router: Router, private backgroundService: BackgroundService, private _appServive: AppService) {
    this.businessLocationId = localStorage.getItem("businessLocationId");
    this.sourceId = localStorage.getItem("sourceId");

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url'] == '/networkConnectivity') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
    const token = localStorage.getItem("token")
    if (token) {
      this.router.navigate(['tab2']);
    } else {
      this.showHeader = false;
      this.router.navigate(['']);
    }
    // this.backgroundService.checkNetworkConnectivity();
    this.backgroundService.startBackgroundTask();
  }

  ngOnInit(): void {
    setInterval(function () {
      this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('wss://dashboard.revords.com/testapi/api/GetMemberLog',
        { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets }).
        configureLogging(LogLevel.Information).withAutomaticReconnect().build();

      this.hubConnectionBuilder.start().then(() => console.log('connected')).catch(err => console.log('Error while connect with server', err));
      this.hubConnectionBuilder.on('SendMessageToUser', (userid: any, result: any) => {
        this._appServive.setData(result);
        console.log(result)
      });
    }.bind(this), 10000);
  }
}


