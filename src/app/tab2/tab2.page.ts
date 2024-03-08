import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { User } from '../api/service/model';
import { RewardService } from '../api/service/rewardService';
import { PromotionService } from '../api/service/promotionService';
import { AnnouncementService } from '../api/service/announcementService';
import { ChecklistService } from '../api/service/checklist';
import * as CONSTANTS from '../api/service/Constants';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { AppService } from '../api/service/app.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements ViewWillEnter {
  signinMemberData: any = [];
  businessLocationId: any;
  businessGroupID: any;
  sourceId: any;
  isLoadingMember = false;
  showData = true;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 4000
    }
  };
  promotions: any = [];
  announcements: any = [];
  rewards: any = [];
  checklist: any = [];
  isLoading = true;
  currentRoute: string;
  constnt: any = CONSTANTS;
  displayStyle = "none";
  promoSubject: string = '';
  promoOccasion: string = '';
  private hubConnectionBuilder!: HubConnection;


  constructor(private userProfile: GetUserProfileService, private user: User, private toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute, private router: Router, private promotionService: PromotionService,
    private announcementService: AnnouncementService, private rewardService: RewardService, private _appServive: AppService,
    private checklistService: ChecklistService) {
    this.businessLocationId = localStorage.getItem("businessLocationId");
    this.sourceId = localStorage.getItem("sourceId");
    this.businessGroupID = localStorage.getItem('businessGroupId');

    // this._appServive.getData.subscribe(data => {
    //   // this.signinMemberData = data

    //   let dataId = {
    //     "id": []
    //   };
    //   data?.forEach(element => {
    //     let detail = {
    //       "id": element.memberId,
    //       "point": element.currentPoints
    //     }
    //     dataId.id.push(detail)
    //   });

    //   let signInId = {
    //     "id": []
    //   };
    //   this.signinMemberData.forEach(element => {
    //     let detail = {
    //       "id": element.memberId,
    //       "point": element.currentPoints
    //     }
    //     signInId.id.push(detail)
    //   });

    //   if (signInId.id.length >= 0) {
    //     if (JSON.stringify(signInId.id) === JSON.stringify(dataId.id)) {
    //       //do nothing
    //     }
    //     else {
    //       var arr = []
    //       var flag = 0;
    //       dataId.id.forEach(function (newChoice) {
    //         signInId.id.forEach(function (oldChoice) {
    //           if (oldChoice.id == newChoice.id) {
    //             flag = 1;
    //           }
    //         });
    //         if (flag != 1) {
    //           arr.push(newChoice);
    //         }
    //         flag = 0;
    //       });

    //       this.signinMemberData = data;
    //       if (arr.length > 0) {
    //         this.isLoading = true;
    //         this.showData = false;
    //         let m = this.signinMemberData.filter((x) => x.memberId == arr[0].id);
    //         setTimeout(() => {
    //           if (router.url == '/tab2') {
    //             let navigationExtras: NavigationExtras = { queryParams: { memberData: JSON.stringify(m[0]), isCancel: true } };
    //             this.router.navigate(['tab2/redeemRewards'], navigationExtras);
    //             this.showData = true;
    //             this.isLoading = false;                
    //           }
    //         }, 1000);
    //       }
    //     }
    //   }
    //   else {
    //     this.signinMemberData = data;
    //   }

    //   // if (this.signinMemberData != undefined && this.signinMemberData != null && this.signinMemberData != '' && this.signinMemberData.length != 0) {
    //   //   this.signinMemberData.forEach(element => {
    //   //     let localDate = CONSTANTS.convertISODateToLocal(element.signIn);
    //   //     var d = Math.round((new Date().getTime() - localDate.getTime()) / 1000);
    //   //     var h = Math.floor(d / 3600);
    //   //     var m = Math.floor(d % 3600 / 60);
    //   //     var s = Math.floor(d % 3600 % 60);
    //   //     element.timer = h.toString().padStart(1, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
    //   //   });
    //   // }
    // }

    // );

    setInterval(() => {
      if (this.signinMemberData != undefined && this.signinMemberData != null && this.signinMemberData != '' && this.signinMemberData.length != 0)
        this.signinMemberData.forEach(element => {
          let localDate = CONSTANTS.convertISODateToLocal(element.signIn);
          var d = Math.round((new Date().getTime() - localDate.getTime()) / 1000);
          var h = Math.floor(d / 3600);
          var m = Math.floor(d % 3600 / 60);
          var s = Math.floor(d % 3600 % 60);
          element.timer = h.toString().padStart(1, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
        });
    }, 1000);
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.isLoading = true;
    this.businessLocationId = localStorage.getItem("businessLocationId");
    this.sourceId = localStorage.getItem("sourceId");
    this.businessGroupID = localStorage.getItem('businessGroupId');
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    this.userProfile.GetMemberBySignout(this.businessLocationId, this.sourceId).subscribe((data: any) => {
      this.signinMemberData = data;
    });

    // setInterval(function () {
    this._appServive.getData.subscribe(data => {

      if (this.router.url == '/tab2') {
        this.GetBusinesswiseSignOutList();
      }
    });
    // }.bind(this), 3000);

    this.userProfile.GetMemberBySignout(this.businessLocationId, this.sourceId).subscribe((data: any) => {
      this.signinMemberData = data;
    }, async (error) => {
      const toast = await this.toastCtrl.create({
        message: "Something went wrong, Try after some time!",
        duration: 2500,
        cssClass: 'custom-toast'
      });
      toast.present();
    });
    this.GetBusinesswiseSignOutList();
    this.GetPromotionsByBusinessLocationID();
    this.GetAnnouncementsByBusinessLocationID();
    this.GetRewardsByBusinessGroupID();
    this.GetChecklistByBusinessGroupID();
  }

  GetBusinesswiseSignOutList() {
    this.userProfile.GetMemberBySignout(this.businessLocationId, this.sourceId).subscribe((data: any) => {
      let dataId = {
        "id": []
      };
      data.forEach(element => {
        let detail = {
          "id": element.memberId,
          "point": element.currentPoints
        }
        dataId.id.push(detail)
      });

      let signInId = {
        "id": []
      };
      this.signinMemberData.forEach(element => {
        let detail = {
          "id": element.memberId,
          "point": element.currentPoints
        }
        signInId.id.push(detail)
      });

      if (signInId.id.length >= 0) {
        if (JSON.stringify(signInId.id) === JSON.stringify(dataId.id)) {
          //do nothig
          // console.log(signInId.id);
        }
        else {
          var arr = []
          var flag = 0;
          dataId.id.forEach(function (newChoice) {
            signInId.id.forEach(function (oldChoice) {
              if (oldChoice.id == newChoice.id) {
                flag = 1;
              }
            });
            if (flag != 1) {
              arr.push(newChoice);
            }
            flag = 0;
          });

          this.signinMemberData = data;
          // console.log(arr);
          if (arr.length > 0) {
            this.isLoading = true;
            this.showData = false;
            let m = this.signinMemberData.filter((x) => x.memberId == arr[0].id);
            setTimeout(() => {
              let navigationExtras: NavigationExtras = { queryParams: { memberData: JSON.stringify(m[0]), isCancel: true } };
              this.router.navigate(['tab2/redeemRewards'], navigationExtras);
              this.showData = true;
              this.isLoading = false;
            }, 1000);
          }
        }
      }
      else {
        this.signinMemberData = data;
      }

      if (this.signinMemberData != undefined && this.signinMemberData != null && this.signinMemberData != '' && this.signinMemberData.length != 0) {
        this.signinMemberData.forEach(element => {
          let localDate = CONSTANTS.convertISODateToLocal(element.signIn);
          var d = Math.round((new Date().getTime() - localDate.getTime()) / 1000);
          var h = Math.floor(d / 3600);
          var m = Math.floor(d % 3600 / 60);
          var s = Math.floor(d % 3600 % 60);
          element.timer = h.toString().padStart(1, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
        });
      }
    },
      async (error) => {
        const toast = await this.toastCtrl.create({
          message: "Something went wrong, Try after some time!",
          duration: 2500
        });
        toast.present();
      }
    );
  }


  GetPromotionsByBusinessLocationID() {
    this.promotionService.GetPromotionsByBusinessLocationID(this.businessLocationId).subscribe((data: any) => {
      this.promotions = data;
    }
    // ,
    //   async (error) => {
    //     const toast = await this.toastCtrl.create({
    //       message: "Something went wrong, Try after some time!",
    //       duration: 5000,
    //       cssClass: 'custom-toast'
    //     });
    //     toast.present();
    //   }
    );
  }

  GetAnnouncementsByBusinessLocationID() {
    this.announcementService.GetAnnouncementsByBusinessLocationID(this.businessLocationId).subscribe((data: any) => {
      this.announcements = data;
    }
    // ,
    //   async (error) => {
    //     const toast = await this.toastCtrl.create({
    //       message: "Something went wrong, Try after some time!",
    //       duration: 5000,
    //       cssClass: 'custom-toast'
    //     });
    //     toast.present();
    //   }
    );
  }

  GetRewardsByBusinessGroupID() {
    this.rewardService.GetRewardConfigByBusinessGroupId(this.businessGroupID).subscribe((data: any) => {
      this.rewards = data;
    }
    // ,
    //   async (error) => {
    //     const toast = await this.toastCtrl.create({
    //       message: "Something went wrong, Try after some time!",
    //       duration: 5000,
    //       cssClass: 'custom-toast'
    //     });
    //     toast.present();
    //   }
    );
  }

  GetChecklistByBusinessGroupID() {
    this.checklistService.GetChecklistByBusinessGroupID(this.businessGroupID).subscribe((data: any) => {
      this.checklist = data;
    }
    // ,
    //   async (error) => {
    //     const toast = await this.toastCtrl.create({
    //       message: "Something went wrong, Try after some time!",
    //       duration: 5000,
    //       cssClass: 'custom-toast'
    //     });
    //     toast.present();
    //   }
    );
  }

  GetMemberDetail(member: any) {
    this.isLoading = true;
    this.showData = false;
    setTimeout(() => {
      let navigationExtras: NavigationExtras = { queryParams: { memberData: JSON.stringify(member), isCancel: false } };
      this.router.navigate(['tab2/redeemRewards'], navigationExtras);
      this.showData = true;
      this.isLoading = false;
    }, 500);
  }

  openPopup(promo: any) {
    this.displayStyle = "block";
    this.promoSubject = promo.promotionalMessage;
    this.promoOccasion = promo.occasion;
  }

  closePopup() {
    this.displayStyle = "none";
    this.promoSubject = '';
    this.promoOccasion = '';
  }
}
