import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { async, map } from 'rxjs';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Router } from '@angular/router';
import { Market } from '@awesome-cordova-plugins/market/ngx';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class BackgroundService {
    downloadVersion: any = '';
    constructor(private http: HttpClient, private backgroungMode: BackgroundMode, private toastCtrl: ToastController,
        private appVersionNative: AppVersion, private router: Router,
        private market: Market, private alertCtrl: AlertController) { }

    startBackgroundTask() {
        this.backgroungMode.enable();
        const backgroundTask = setInterval(() => {
            // this.appVersionNative.getVersionNumber().then(async (versionNumber: any) => {
                // let currentVersion: any = versionNumber;

                this.GetLatestStoreTabletAppVersion().subscribe(async (res) => {
                    // if (currentVersion != res.appVersion) {
                        // this.downloadVersion = res.appVersion;
                        // const alert = await this.alertCtrl.create({
                        //     header: 'New Release !',
                        //     message: 'Update Revords Store to continue..',
                        //     buttons: ['Update'],
                        //     backdropDismiss: false
                        // });
                        // await alert.present();

                        // const result = (await alert.onDidDismiss().then((res) => {
                        //     if (res.role == undefined) {
                        //         this.market.open("com.storerevords.app").then(async (res) => {
                        //             // console.log(res);
                        //         });
                        //     }
                        // }));
                        // this.update();
                        // clearInterval(backgroundTask);
                        // this.router.navigate(['update']);
                    // }
                    // else {
                    //     clearInterval(backgroundTask);
                    // }
                },
                    async (error) => {
                        console.log('error', error)
                        this.router.navigate(['networkConnectivity']);
                        // clearInterval(backgroundTask);
                    });
            // });
        }, 5000);
    }

    // async update() {
    //     let fileName = this.downloadVersion != null && this.downloadVersion != '' && this.downloadVersion != undefined ?
    //         this.downloadVersion.toString().replaceAll('.', "_") : '';
    //     await ApkUpdater.download(
    //         CONSTANTS.DownloadAPK_ENDPOINT + 'RVD_Store_' + fileName + '.zip',
    //         {
    //             zipPassword: 'hitech@123',
    //             onDownloadProgress: console.log,
    //             onUnzipProgress: console.log
    //         }
    //     );

    //     await ApkUpdater.install().then((res) => {
    //         console.log(res);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }
    // checkNetworkConnectivity() {
    //     this.speedTestService.isOnline().subscribe(
    //         async (isOnline) => {
    //             if (isOnline === false) {
    //                 this.router.navigate(['networkConnectivity']);
    //             }
    //         }
    //     );
    //     const backgroundTaskConnectivity =  setInterval(() => {
    //         this.speedTestService.isOnline().subscribe(
    //             async (isOnline) => {
    //                 if (isOnline === false) {                        
    //                     console.log("Connectivity")
    //                     this.router.navigate(['networkConnectivity']);
    //                 }
    //             }
    //         );
    //     }, 5000);
    // }

    GetLatestStoreTabletAppVersion() {
        return this.http.get<any>(CONSTANTS.API_ENDPOINT + "DashBoard/GetLatestStoreTabletAppVersion")
            .pipe(map(member => {
                return member;
            }));
    }
}


