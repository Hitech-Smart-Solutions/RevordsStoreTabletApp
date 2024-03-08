import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss']
})

export class SettingPage {

  isLoading = false;
  currentVersion: any;
  businessGroupName: any;
  sourceName: any;

  constructor(public activatedRoute: ActivatedRoute, private appVersionNative: AppVersion) {
    this.sourceName = localStorage.getItem('sourceName');
    this.businessGroupName = localStorage.getItem('businessGroupName');

    this.appVersionNative.getVersionNumber().then(async (versionNumber: any) => {
      this.currentVersion = versionNumber;
    });
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {

    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 500);
  }
}