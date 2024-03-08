import { Component, OnInit } from '@angular/core';

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
  constructor() {    
    this.businessGroupLogo = localStorage.getItem('businessGroupImage');
    setInterval(() => {
      this.todaysDate = new Date();
    }, 1000);
  }

  ngOnInit() {
  }

}
