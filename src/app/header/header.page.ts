import { Component, OnInit } from '@angular/core';
import { AppService } from '../api/service/app.service';
import * as CONSTANTS from '../api/service/Constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  todaysDate: Date = new Date();
  speedSignal: any = "../../assets/wifi.png";
  internetspeed: any = 0;
  businessGroupLogo: any;
  constructor(private _appService: AppService) {    
    // this.businessGroupLogo = localStorage.getItem('businessGroupImage');
    setInterval(() => {
      this.todaysDate = new Date();
    }, 1000);

    this._appService.getbusinessGroupLogo.subscribe((logo) => {
      this.businessGroupLogo = CONSTANTS.DownloadAPK_ENDPOINT + logo;
    });
  }
  
  ngOnInit() {
  }

}
