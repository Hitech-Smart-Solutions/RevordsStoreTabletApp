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
                this.GetLatestStoreTabletAppVersion().subscribe(async (res) => {
                    // Nothing to do
                },
                    async (error) => {
                        this.router.navigate(['networkConnectivity']);
                    });
        }, 5000);
    }

    GetLatestStoreTabletAppVersion() {
        return this.http.get<any>(CONSTANTS.API_ENDPOINT + "DashBoard/GetLatestStoreTabletAppVersion")
            .pipe(map(member => {
                return member;
            }));
    }
}


