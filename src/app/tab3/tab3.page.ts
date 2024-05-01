import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { ToastController } from '@ionic/angular';
import * as CONSTANTS from '../api/service/Constants';
import { PromotionService } from '../api/service/promotionService';
import { RewardService } from '../api/service/rewardService';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  businessGroupId: any;
  businessLocationId: any;
  member: any = [];
  memberProfile: any = [];
  phoneNo: any;
  numP1: any;
  numP2: any;
  numP3: any;
  promotionData: any;
  autopilotData: any;
  rewardData: any = [];
  spinWheelData: any = [];
  summaryData: any = [];
  isRewardExist = true;
  EarnedPoints: number = 0;
  EarnedPoints1: string;
  NewTotalPoint: any;
  CountPromotion: number = 0;
  step: any = 1;
  disableBtnPrevious: any = '2px solid #d9e7ed';
  stateChecked: boolean = false;
  redeemData: object[] = [];
  newcursor = false;
  multistep = new FormGroup({
    promotionDetails: new FormGroup({
      selectedSpinWheel: new FormControl(),
      selectedPromotion: new FormControl(),
      selectedAutopilot: new FormControl(),
      selectedReward: new FormControl(),
    }),
    addPointDetails: new FormGroup({
      display: new FormControl('0'),
    }),
    summaryDetails: new FormGroup({}),
  });
  new: any;
  isLoading = false;
  isPopupOpen = false;
  showData = true;
  showPromotionData: boolean = false;
  showAutopilotData: boolean = false;
  showRewardData: boolean = false;
  showSpinWheelData: boolean = false;
  showBeforeSpinWheelData: boolean = false;
  isSpinWheelInteger: boolean = false;
  spinWheelHist: any;
  isHighroller: any;
  sourceId: any;
  isCancel: any;
  showBtnTextCancel: any;
  _defaultOpts: {
    id: number;
    indexID: number;
    arctext: string;
    colorCode: string;
    probability: number;
    promotionId: number;
    isInteger: boolean;
    configName: string;
  }[] = [];
  myInterval: any;
  constnt: any = CONSTANTS;
  disableRedeemBtn: Boolean = true;
  isHideRewards: any = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private userProfile: GetUserProfileService,
    private rewardService: RewardService,
    private promotionService: PromotionService,
    private toastCtrl: ToastController
  ) {
    this.businessGroupId = localStorage.getItem('businessGroupId');
    this.businessLocationId = localStorage.getItem('businessLocationId');
    this.sourceId = localStorage.getItem('sourceId');
    this.CountPromotion = 0;

    this.activatedRoute.queryParams.subscribe(async (params) => {
      if (params && params['memberData']) {
        this.memberProfile = JSON.parse(params['memberData']);
        this.isCancel = params['isCancel'];
        if (this.isCancel == 'true') {
          this.showBtnTextCancel = 'Cancel';
        } else {
          this.showBtnTextCancel = 'Sign Out ';
        }

        if (
          this.memberProfile != undefined &&
          this.memberProfile != null &&
          this.memberProfile != ''
        ) {
          this.member = this.memberProfile;
          if (
            this.member.masterMemberID <= 9 &&
            this.member.masterMemberID >= 1
          ) {
            //If Annonymous then do nothing
          } else {
            this.isLoading = true;

            this.numP1 = this.member.phoneNo.toString().substring(0, 3);
            this.numP2 = this.member.phoneNo.toString().substring(3, 6);
            this.numP3 = this.member.phoneNo.toString().substring(6);
            this.phoneNo =
              '(' + this.numP1 + ') ' + this.numP2 + ' ' + this.numP3;

            this.promotionDetails.selectedPromotion.setValue(false);
            this.promotionDetails.selectedAutopilot.setValue(false);
            this.promotionDetails.selectedReward.setValue(false);            

            await this.userProfile
              .GetSpinWheelConfigByMemberIDBusinessLocationID(
                this.member.memberId,
                this.businessLocationId,
                2
              )
              .pipe()
              .subscribe({
                next: (data) => {
                  this._defaultOpts = [];
                  localStorage.removeItem('OPTS');
                  data.forEach((element: any) => {
                    this._defaultOpts.push({
                      id: element.id,
                      indexID: element.indexID,
                      arctext: element.arctext,
                      colorCode: element.colorCode,
                      probability: element.probability,
                      promotionId: element.promotionId,
                      isInteger: element.isInteger,
                      configName: element.configName,
                    });
                  });

                  this.showBeforeSpinWheelData = true;
                  this.myInterval = setInterval(
                    async function () {
                      await this.GetSpinWheelText();
                    }.bind(this),
                    1500
                  );
                },
              });

            await this.GetPromotionsList();
            await this.GetAutopilotList();
            await this.GetRewardList();
            setTimeout(() => {
              this.isLoading = false;
            }, 1000);
          }
        }
      }
    });

    //This is for displaying time duration of member
    setInterval(() => {
      if (
        this.member != undefined &&
        this.member != null &&
        this.member != '' &&
        this.member.length != 0
      ) {
        let localDate = CONSTANTS.convertISODateToLocal(this.member.signIn);
        var d = Math.round((new Date().getTime() - localDate.getTime()) / 1000);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);
        this.member.timer =
          h.toString().padStart(1, '0') +
          ':' +
          m.toString().padStart(2, '0') +
          ':' +
          s.toString().padStart(2, '0');
      }
    }, 1000);
  }

  ngOnInit() {}

  displayStyle = 'none';

  openPopup() {
    //Open redeem or signout popup modal
    this.displayStyle = 'block';
    this.isHideRewards = true;
    this.isPopupOpen = true;
    this.disableRedeemBtn = true;
  }
  closePopup() {
    //Close redeem or signout popup modal
    this.displayStyle = 'none';
    this.isHideRewards = false;
    this.isPopupOpen = false;
    this.disableRedeemBtn = false;
  }

  async GetRedeemRewardCount() {
    //Get Redeemed count and total points to assign on summary page
    await this.userProfile
      .GetRedeemRewardCount(
        this.businessLocationId,
        this.sourceId,
        this.member.memberId
      )
      .subscribe(
        (data: any) => {
          this.summaryData = data;
          this.CountPromotion =
            this.CountPromotion + this.summaryData.rewardCount;
          this.EarnedPoints1 = this.summaryData.earnedPoints;
          this.NewTotalPoint =
            this.summaryData.earnedPoints + this.member.currentPoints;
        },
        async (error) => {
          // console.log(error);
        }
      );
  }

  async GetPromotionsList() {
    //Get promotion list if customer has any
    await this.promotionService
      .GetPromotionsByMemberId(this.businessLocationId, this.member.memberId)
      .subscribe(
        (data: any) => {
          this.promotionData = data;
          if (this.promotionData.length > 0) {
            this.showPromotionData = true;
            this.promotionData.forEach((element) => {
              element.stateChecked = false;
            });
          } else {
            this.showPromotionData = false;
          }
        },
        async (error) => {
          this.showPromotionData = false;
        }
      );
  }

  async GetSpinWheelText() {
    //Get spinwheel won text if customer has any
    await this.userProfile
      .GetSpinWheelTextByMemberId(
        this.businessLocationId,
        this.member.memberId,
        CONSTANTS.ISODate()
      )
      .subscribe((data: any) => {
        this.spinWheelData = data;
        if (this.spinWheelData) {
          this.showSpinWheelData = true;
          if (this.spinWheelData.arcType != 1) {
            clearInterval(this.myInterval);

            if (this.spinWheelData.arcType == 2) {
              this.promotionDetails.selectedSpinWheel.disable();
            } else {
              if (
                this.spinWheelData.points == 0 &&
                this.spinWheelData.isSpinRedeem == false
              ) {
                this.promotionDetails.selectedSpinWheel.enable();
                this.isSpinWheelInteger = false;
              } else {
                this.promotionDetails.selectedSpinWheel.disable();
                this.isSpinWheelInteger = true;
              }
            }
          } else {
            this.promotionDetails.selectedSpinWheel.disable();
          }
        }
      });
  }

  async GetAutopilotList() {
    //Get autopilot list if customer has any
    await this.userProfile
      .GetAutopilotByMemberId(this.businessGroupId, this.member.memberId)
      .subscribe(
        (data: any) => {
          this.autopilotData = data;
          if (this.autopilotData.length > 0) {
            this.showAutopilotData = true;
          } else {
            this.showAutopilotData = false;
          }
        },
        async (error) => {
          this.showAutopilotData = false;
        }
      );
  }

  async GetRewardList() {
    //Get standard reward list if customer has any
    await this.rewardService
      .GetRewardByMemberId(this.businessGroupId, this.member.memberId)
      .subscribe(
        (data: any) => {
          this.rewardData = data;
          if (this.rewardData) {
            this.showRewardData = true;
          }
        },
        async (error) => {
          if (error.status == 404) {
            this.showRewardData = false;
          } else {
            this.showRewardData = false;
          }
        }
      );
  }

  get promotionDetails() {
    return this.multistep.controls['promotionDetails']['controls'];
  }
  get AddPointDetails() {
    return this.multistep.controls['addPointDetails']['controls'];
  }
  get SummaryDetails() {
    return this.multistep.controls['summaryDetails']['controls'];
  }

  next() {
    if (this.isCancel == 'true') {
      this.router.navigate(['tab2']);
    } else {
      if (
        this.multistep.controls['promotionDetails'].invalid &&
        this.step == 1
      ) {
        return;
      }
      this.step = this.step + 1;
      this.disableBtnPrevious = false;

      if (this.step == 2) {
        this.GetRedeemRewardCount();
      }
    }
  }

  //Call this function when click on redeem button
  async RedeemData() {
    this.isLoading = true;

    let UserId = Number(localStorage.getItem('userId'));
    let redeemData = {
      id: this.member.id,
      memberID: this.member.memberId,
      earnedPoints: this.EarnedPoints,
      speenwheelPoints: 0,
      createdBy: UserId,
      createdDate: CONSTANTS.ISODate(),
      businessLocationID: this.businessLocationId,
      sourceId: this.sourceId,
      promotionId: [],
      autopilotId: [],
      rewardId: [],
      spinWheelId: [],
    };

    //checks if promotion exist then checked(selected) or not
    if (this.promotionData) {
      let objPromotionData = this.promotionData.filter(
        (x) => x.stateChecked == true
      );

      objPromotionData.forEach((element) => {
        let detail = {
          id: element.id,
          text: element.promotionalMessage,
        };
        redeemData.promotionId.push(detail);
      });
    }

    //checks if autopilot exist then checked(selected) or not
    if (this.autopilotData) {
      let objAutopilotData = this.autopilotData.filter(
        (x) => x.stateChecked == true
      );

      objAutopilotData.forEach((element) => {
        let detail = {
          id: element.historyId,
          text: element.rewardName,
        };
        redeemData.autopilotId.push(detail);
      });
    }

    //checks if standard rewards exist then checked(selected) or not
    if (this.rewardData) {
      if (this.rewardData.stateChecked == true) {
        let detail = {
          id: this.rewardData.id,
          text: this.rewardData.rewardName,
          points: this.rewardData.points,
        };
        redeemData.rewardId.push(detail);
      }
    }
    if (this.spinWheelData) {
      if (this.spinWheelData.stateChecked == true) {
        let detail = {
          id: this.spinWheelData.activityHistoryId,
        };
        redeemData.spinWheelId.push(detail);
      }
    }
    if (
      redeemData.autopilotId.length == 0 &&
      redeemData.promotionId.length == 0 &&
      redeemData.rewardId.length == 0 &&
      (this.spinWheelData.points != 0 || redeemData.spinWheelId.length == 0)
    ) {
      this.closePopup();
      this.isLoading = false;
      const toast = await this.toastCtrl.create({
        message: 'Please Select Rewards to Redeem',
        duration: 2000,
        cssClass: 'custom-toast',
      });
      toast.present();
    } else {
      this.isLoading = true;
      this.closePopup();
      setTimeout(() => {
        this.promotionService.UpdateRedeemRewardsInStore(redeemData).subscribe(
          async (data: any) => {
            this.router.navigate(['tab2']);
            const toast = await this.toastCtrl.create({
              message: 'Redeemed Successfully!',
              duration: 2000,
              cssClass: 'custom-toastSuccess',
            });
            toast.present();
            this.isLoading = false;
          },
          async (error) => {
            const toast = await this.toastCtrl.create({
              message: 'Something went wrong, Try again after some time!',
              duration: 2500,
              cssClass: 'custom-toast',
            });
            this.isLoading = false;
            toast.present();
          }
        );
      }, 1000);
    }
  }

  submit() {
    if (this.multistep.controls['promotionDetails'].invalid && this.step == 1) {
      return;
    }
    let UserId = Number(localStorage.getItem('userId'));
    let redeemData = {
      id: this.member.id,
      memberID: this.member.memberId,
      earnedPoints: this.EarnedPoints1,
      speenwheelPoints: 0,
      createdBy: UserId,
      createdDate: CONSTANTS.ISODate(),
      businessLocationID: this.businessLocationId,
      sourceId: this.sourceId,
      promotionId: [],
      autopilotId: [],
      rewardId: [],
      spinWheelId: [],
    };

    if (this.member.masterMemberID > 9) {
      if (this.promotionData) {
        let objPromotionData = this.promotionData.filter(
          (x) => x.stateChecked == true
        );

        objPromotionData.forEach((element) => {
          let detail = {
            id: element.id,
            text: element.promotionalMessage,
          };
          redeemData.promotionId.push(detail);
        });
      }

      if (this.autopilotData) {
        let objAutopilotData = this.autopilotData.filter(
          (x) => x.stateChecked == true
        );

        objAutopilotData.forEach((element) => {
          let detail = {
            id: element.historyId,
            text: element.rewardName,
          };
          redeemData.autopilotId.push(detail);
        });
      }

      if (this.rewardData.stateChecked == true) {
        let detail = {
          id: this.rewardData.id,
          text: this.rewardData.rewardName,
          points: this.rewardData.points,
        };
        redeemData.rewardId.push(detail);
      }

      if (this.spinWheelData) {
        if (this.spinWheelData.stateChecked == true) {
          let detail = {
            id: this.spinWheelData.activityHistoryId,
          };
          redeemData.spinWheelId.push(detail);
        }
      }
    }

    this.isLoading = true;
    this.showData = false;

    this.closePopup();

    setTimeout(() => {
      this.promotionService.UpdateRewardsInStore(redeemData).subscribe(
        (data: any) => {
          this.router.navigate(['tab2']);
          this.DisplaySignOutToast();
          this.step = 1;
          this.isLoading = false;
          this.showData = true;
        },
        async (error) => {
          const toast = await this.toastCtrl.create({
            message: 'Something went wrong, Try again after some time!',
            duration: 2500,
            cssClass: 'custom-toast',
          });
          this.showData = true;
          this.isLoading = false;
          toast.present();
        }
      );
    }, 1000);
  }

  async DisplaySignOutToast() {
    const toast = await this.toastCtrl.create({
      message: 'Successfully Logged Out',
      duration: 2000,
      cssClass: 'custom-toastSuccess',
    });
    toast.present();
  }

  previous() {
    if (this.isPopupOpen == false) {
      this.disableRedeemBtn = true;
      if (this.member.masterMemberID <= 9 && this.member.masterMemberID >= 1) {
        this.router.navigate(['tab2']);
        this.step = 1;
      } else {
        this.step = this.step - 1;
        if (this.step == 1) {
          this.CountPromotion = 0;
          this.GetSpinWheelText();
          this.GetPromotionsList();
          this.GetAutopilotList();
          this.GetRewardList();
          this.promotionDetails.selectedSpinWheel.setValue(false);
          this.promotionDetails.selectedPromotion.setValue(false);
          this.promotionDetails.selectedAutopilot.setValue(false);
          this.promotionDetails.selectedReward.setValue(false);
          this.AddPointDetails.display.setValue('0');
        }
        if (this.step == 0) {
          this.isLoading = true;
          setTimeout(async () => {
            await clearInterval(this.myInterval);
            this.router.navigate(['tab2']);
            this.step = 1;
            this.isLoading = false;
          }, 500);
        }
      }
    }
  }

  onSpinWheelSelected(e: any) {
    if (e.detail.checked) {
      this.CountPromotion = this.CountPromotion + 1;
      this.spinWheelData.spinWheelBorder = '2px solid #6a5471';
      this.spinWheelData.transformScale = 'scale(0.96)';
      this.spinWheelData.stateChecked = true;
    } else if (!e.detail.checked) {
      this.CountPromotion = this.CountPromotion - 1;
      this.spinWheelData.spinWheelBorder = '2px solid #d9e7ed';
      this.spinWheelData.transformScale = 'scale(0.9)';
      this.spinWheelData.stateChecked = false;
    }
    this.disableRedeemButton();
  }

  onPromotionSelected(e: any, p: any) {
    if (e.detail.checked) {
      this.promotionData.filter(
        (x) => x.promotionId == p.promotionId
      )[0].promotionBorder = '2px solid #dda045';
      this.promotionData.filter(
        (x) => x.promotionId == p.promotionId
      )[0].transformScale = 'scale(0.96)';
      this.promotionData.filter(
        (x) => x.promotionId == p.promotionId
      )[0].stateChecked = true;
      this.CountPromotion = this.CountPromotion + 1;
    } else if (!e.detail.checked) {
      this.promotionData.filter(
        (x) => x.promotionId == p.promotionId
      )[0].promotionBorder = '2px solid #d9e7ed';
      this.promotionData.filter(
        (x) => x.promotionId == p.promotionId
      )[0].transformScale = 'scale(0.9)';
      this.promotionData.filter(
        (x) => x.promotionId == p.promotionId
      )[0].stateChecked = false;
      this.CountPromotion = this.CountPromotion - 1;
    }
    this.disableRedeemButton();
  }

  onAutopilotSelected(e: any, p: any) {
    if (e.detail.checked) {
      this.autopilotData.filter(
        (x) => x.historyId == p.historyId
      )[0].autoPilotBorder = '2px solid #2196f396';
      this.autopilotData.filter(
        (x) => x.historyId == p.historyId
      )[0].transformScale = 'scale(0.96)';
      this.autopilotData.filter(
        (x) => x.historyId == p.historyId
      )[0].stateChecked = true;
      this.CountPromotion = this.CountPromotion + 1;
    } else if (!e.detail.checked) {
      this.autopilotData.filter(
        (x) => x.historyId == p.historyId
      )[0].autoPilotBorder = '2px solid #d9e7ed';
      this.autopilotData.filter(
        (x) => x.historyId == p.historyId
      )[0].transformScale = 'scale(0.9)';
      this.autopilotData.filter(
        (x) => x.historyId == p.historyId
      )[0].stateChecked = false;
      this.CountPromotion = this.CountPromotion - 1;
    }
    this.disableRedeemButton();
  }

  onRewardSelected(e: any) {
    if (e.detail.checked) {
      this.rewardData.rewardBorder = '2px solid #2ac95d';
      this.rewardData.transformScale = 'scale(0.96)';
      this.rewardData.stateChecked = true;
      this.CountPromotion = this.CountPromotion + 1;
    } else if (!e.detail.checked) {
      this.rewardData.rewardBorder = '2px solid #d9e7ed';
      this.rewardData.transformScale = 'scale(0.9)';
      this.rewardData.stateChecked = false;
      this.CountPromotion = this.CountPromotion - 1;
    }
    this.disableRedeemButton();
  }

  GotoProfile() {
    if (
      this.step == 1 &&
      !this.isHideRewards &&
      this.member.masterMemberID > 9
    ) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          memberData: JSON.stringify(this.member),
          CountPromotion: this.CountPromotion,
        },
      };
      this.router.navigate(['tab2/memberProfile'], navigationExtras);
    }
  }

  click(val: any) {
    switch (val) {
      case 'delete-left':
        this.new = this.AddPointDetails.display.value;
        this.new = this.AddPointDetails.display.value.substr(
          0,
          this.new.length - 1
        );
        if (this.new.length == 0) {
          this.multistep.controls['addPointDetails'].controls[
            'display'
          ].setValue('0');
        } else {
          this.multistep.controls['addPointDetails'].controls[
            'display'
          ].setValue(this.new);
        }
        break;
      case '0':
        this.addnumber('0');
        break;
      case '1':
        this.addnumber('1');
        break;
      case '2':
        this.addnumber('2');
        break;
      case '3':
        this.addnumber('3');
        break;
      case '4':
        this.addnumber('4');
        break;
      case '5':
        this.addnumber('5');
        break;
      case '6':
        this.addnumber('6');
        break;
      case '7':
        this.addnumber('7');
        break;
      case '8':
        this.addnumber('8');
        break;
      case '9':
        this.addnumber('9');
        break;
    }
  }

  addnumber(nbr: string) {
    if (nbr === '0') {
      if (this.newcursor === true) {
        this.multistep.controls['addPointDetails'].controls['display'].setValue(
          nbr
        );
        this.newcursor = false;
      } else if (
        this.multistep.controls['addPointDetails'].controls['display'].value !==
        '0'
      ) {
        this.multistep.controls['addPointDetails'].controls['display'].setValue(
          this.multistep.controls['addPointDetails'].controls[
            'display'
          ].value.toString() + nbr
        );
      }
    } else {
      if (this.newcursor === true) {
        this.multistep.controls['addPointDetails'].controls['display'].setValue(
          nbr
        );
        this.newcursor = false;
      } else if (
        this.multistep.controls['addPointDetails'].controls['display'].value ===
        '0'
      ) {
        this.multistep.controls['addPointDetails'].controls['display'].setValue(
          nbr
        );
      } else {
        this.multistep.controls['addPointDetails'].controls['display'].setValue(
          this.multistep.controls['addPointDetails'].controls[
            'display'
          ].value.toString() + nbr
        );
      }
    }
  }

  disableRedeemButton() {
    let redeemData = {
      promotionId: [],
      autopilotId: [],
      rewardId: [],
      spinWheelId: [],
    };
    if (this.promotionData) {
      let objPromotionData = this.promotionData.filter(
        (x) => x.stateChecked == true
      );

      objPromotionData.forEach((element) => {
        let detail = {
          id: element.id,
          text: element.promotionalMessage,
        };
        redeemData.promotionId.push(detail);
      });
    }
    if (this.autopilotData) {
      let objAutopilotData = this.autopilotData.filter(
        (x) => x.stateChecked == true
      );

      objAutopilotData.forEach((element) => {
        let detail = {
          id: element.historyId,
          text: element.rewardName,
        };
        redeemData.autopilotId.push(detail);
      });
    }
    if (this.rewardData) {
      if (this.rewardData.stateChecked == true) {
        let detail = {
          id: this.rewardData.id,
          text: this.rewardData.rewardName,
          points: this.rewardData.points,
        };
        redeemData.rewardId.push(detail);
      }
    }
    if (this.spinWheelData) {
      if (this.spinWheelData.stateChecked == true) {
        let detail = {
          id: this.spinWheelData.activityHistoryId,
        };
        redeemData.spinWheelId.push(detail);
      }
    }

    if (
      redeemData.autopilotId.length == 0 &&
      redeemData.promotionId.length == 0 &&
      redeemData.rewardId.length == 0 &&
      ((this.spinWheelData != null && this.spinWheelData.points != 0) ||
        redeemData.spinWheelId.length == 0)
    ) {
      this.disableRedeemBtn = true;
    } else {
      this.disableRedeemBtn = false;
    }
  }
}
