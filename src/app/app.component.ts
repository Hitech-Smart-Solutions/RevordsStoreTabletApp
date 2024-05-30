import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BackgroundService } from './api/service/backgroundService';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import * as signalR from '../../node_modules/@microsoft/signalr';
import { AppService } from './api/service/app.service';
import { ToastController } from '@ionic/angular';
import { GetUserProfileService } from './api/service/get-user-profile.service';
import { User } from './api/service/model';
import * as CONSTANTS from './api/service/Constants';

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
  userData: any;

  constructor(
    private router: Router,
    private backgroundService: BackgroundService,
    private userProfile: GetUserProfileService,
    private user: User,
    private appService: AppService
  )
  {
    this.businessLocationId = localStorage.getItem('businessLocationId');
    this.sourceId = localStorage.getItem('sourceId');

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url'] == '/networkConnectivity') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
    this.checkTokenExist();
    // this.backgroundService.checkNetworkConnectivity();
    this.backgroundService.startBackgroundTask();
  }

  getData() {
    let uName = localStorage.getItem('userName');
    let pwd = localStorage.getItem('pwd');

    // //Get Business Location Data by Email and Password
    this.userProfile.Users(uName, pwd).subscribe(
      (data: any) => {
        this.userData = data;
        if (
          this.userData != '' &&
          this.userData != null &&
          this.userData != undefined
        ) {
          this.user.uniqueId = this.userData.uniqueId;
          this.user.userId = this.userData.userId;
          this.user.userName = this.userData.userName;
          this.user.password = this.userData.password;
          this.user.firstName = this.userData.firstName;
          this.user.lastName = this.userData.lastName;
          this.user.isAdministrator = this.userData.isAdministrator;
          this.user.mobile = this.userData.mobile;
          this.user.email = this.userData.email;
          this.user.isActive = this.userData.isActive;
          this.user.createdBy = this.userData.createdBy;
          this.user.createdDate = CONSTANTS.convertISODateToLocal(
            this.userData.createdDate
          );
          this.user.lastModifiedBy = this.userData.lastModifiedBy;
          this.user.lastModifiedDate = CONSTANTS.convertISODateToLocal(
            this.userData.lastModifiedDate
          );
          this.user.userTypeId = this.userData.userTypeId;
          this.user.businessLocationId =
            this.userData.business[0].businessLocationId;
          this.user.businessGroupId = this.userData.businessGroupId;
          this.user.businessGroupName = this.userData.businessGroupName;
          this.user.businessGroupImage = this.userData.businessGroupImage;
          this.user.sourceId = this.userData.business[0].sourceId;
          this.user.sourceName = this.userData.business[0].sourceName;
          this.user.IsAgeRestriction =
            this.userData.business[0].isAgeRestriction;
        }

        localStorage.setItem('userId', String(this.user.userId));
        localStorage.setItem(
          'businessLocationId',
          String(this.user.businessLocationId)
        );
        localStorage.setItem('userName', String(this.user.userName));
        localStorage.setItem('pwd', String(this.user.password));
        localStorage.setItem(
          'businessGroupName',
          String(this.user.businessGroupName)
        );
        localStorage.setItem(
          'businessGroupId',
          String(this.user.businessGroupId)
        );
        localStorage.setItem(
          'businessGroupImage',
          String(this.user.businessGroupImage)
        );
        localStorage.setItem('sourceId', String(this.user.sourceId));
        localStorage.setItem('sourceName', String(this.user.sourceName));
        localStorage.setItem('token', this.userData);
        // this.router.navigate(['tab2']);
      },
      async (error) => {
        // // if (error.status == 404) {
        // //   const toast = await this.toastCtrl.create({
        // //     message: 'Enter valid credential!!',
        // //     duration: 2500,
        // //     cssClass: 'custom-toastDanger',
        // //   });
        // //   toast.present();
        // // } else {
        // const toast = await this.toastCtrl.create({
        //   message: 'Something went wrong, Try again!',
        //   duration: 2500,
        //   cssClass: 'custom-toast',
        // });
        // toast.present();
        // this.router.navigate(['']);
      // }
      }
    );
  }

  async checkTokenExist() {
    const token = localStorage.getItem('token');
    if (token) {
      // await this.getData();
      this.router.navigate(['tab2']);
    } else {
      this.showHeader = false;
      this.router.navigate(['']);
    }
  }
  ngOnInit(): void {
    // setInterval(
    //   function () {
        this.hubConnectionBuilder = new HubConnectionBuilder()
          .withUrl('wss://dashboard.revords.com/testapi/api/GetMemberLog', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
          })
          .configureLogging(LogLevel.Information)
          .withAutomaticReconnect()
          .build();

        this.hubConnectionBuilder
          .start()
          .then()
          .catch((err) => {
            console.log('Error while connect with server', err);
            this.router.navigate(['networkConnectivity']);
          });
        this.hubConnectionBuilder.on(
          'SendMessageToUser',
          (userid: any, result: any) => {
            this.appService.setData(result);
          }
        );
      // }.bind(this)
      // 10000
    // );
  }
}
