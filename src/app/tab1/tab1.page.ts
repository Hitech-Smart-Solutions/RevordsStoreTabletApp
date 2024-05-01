import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { User } from '../api/service/model';
import { ToastController } from '@ionic/angular';
import * as CONSTANTS from '../api/service/Constants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  Email: any;
  Password: any;
  userData: any;
  isLoadingMember = false;
  showLoginForm: boolean = false;

  constructor(private router: Router, private userProfile: GetUserProfileService,
    private user: User, private toastCtrl: ToastController) {
  }

  signUp() {
    this.showLoginForm = true;
    this.isLoadingMember = true;

    //Get Business Location Data by Email and Password
    this.userProfile.Users(this.Email, this.Password).subscribe((data: any) => {
      this.userData = data;
      if (this.userData != '' && this.userData != null && this.userData != undefined) {
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
        this.user.createdDate = CONSTANTS.convertISODateToLocal(this.userData.createdDate);
        this.user.lastModifiedBy = this.userData.lastModifiedBy;
        this.user.lastModifiedDate = CONSTANTS.convertISODateToLocal(this.userData.lastModifiedDate);
        this.user.userTypeId = this.userData.userTypeId;
        this.user.businessLocationId = this.userData.business[0].businessLocationId;
        this.user.businessGroupId = this.userData.businessGroupId;
        this.user.businessGroupName = this.userData.businessGroupName;
        this.user.businessGroupImage = this.userData.businessGroupImage;
        this.user.sourceId = this.userData.business[0].sourceId;
        this.user.sourceName = this.userData.business[0].sourceName;
        this.user.IsAgeRestriction = this.userData.business[0].isAgeRestriction;
      }

      localStorage.setItem('userId', String(this.user.userId));
      localStorage.setItem('businessLocationId', String(this.user.businessLocationId));
      localStorage.setItem('userName', String(this.user.userName));
      localStorage.setItem('pwd', String(this.user.password));
      localStorage.setItem('businessGroupName', String(this.user.businessGroupName));
      localStorage.setItem('businessGroupId', String(this.user.businessGroupId));
      localStorage.setItem('businessGroupImage', String(this.user.businessGroupImage));
      localStorage.setItem('sourceId', String(this.user.sourceId));
      localStorage.setItem('sourceName', String(this.user.sourceName));
      localStorage.setItem('token', this.userData);
      this.isLoadingMember = false;
      this.router.navigate(['tab2']);
      this.showLoginForm = false;
    },
      async (error) => {
        if (error.status == 404) {
          const toast = await this.toastCtrl.create({
            message: "Enter valid credential!!",
            duration: 2500,
            cssClass: 'custom-toastDanger'
          });
          toast.present();
        } else {
          const toast = await this.toastCtrl.create({
            message: "Something went wrong, Try again!",
            duration: 2500,
            cssClass: 'custom-toast'
          });
          toast.present();
        }
        this.isLoadingMember = false;
        this.showLoginForm = false;        
      }
    );
  }
}
