import { Component, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { IonModal, ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CONSTANTS from '../api/service/Constants';
import { MemberProfileService } from '../api/service/memberProfileService';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})

export class Tab6Page {
  historyData: any;
  historyDataForFilter: any;
  isLoading = true;
  businessLocationId = Number(localStorage.getItem("businessLocationId"));
  isDataExist: boolean = false;
  activityType: any;
  HistoryFormGroup: FormGroup;
  totalPointsEarned: number = 0;
  totalRewardsEarned: number = 0;
  totalPromoActivity: number = 0;
  totalAPActivity: number = 0;
  selectedLabelClick: any = "All Activity";
  EarnedPointSum: any = 0;
  memberData: any;
  phoneNo: any;
  Notes: any;
  memberID: any;
  membername: any;
  email: any;
  highroller: boolean = false;
  freePlayer: boolean = false;
  memberSince: any;
  currentPoints: any;
  totalPoints: any;
  birthDate: any;
  memberDetails = new FormGroup({
    addMemberDetails: new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")),
      highroller: new FormControl(''),
      freePlayer: new FormControl(''),
      notes: new FormControl('')
    })
  });
  isSaveLoading = false;
  positiveFlagRequired: any = false;
  positiveFlagName: any;
  negativeFlagName: any;
  businessGroupId: any;
  oldNote: any;
  notesHistory: any;

  constructor(public activatedRoute: ActivatedRoute, private router: Router, private userProfile: GetUserProfileService,
    private toastCtrl: ToastController, private memberProfileService: MemberProfileService) {
      this.businessGroupId = localStorage.getItem('businessGroupId');
      this.userProfile
      .GetBusinessGroupByID(this.businessGroupId)
      .subscribe((data: any) => {
        this.positiveFlagRequired = data.positiveFlagRequired;
        this.positiveFlagName = data.positiveFlagName;
        this.negativeFlagName = data.negativeFlagName;
      });
    this.HistoryFormGroup = new FormGroup({
      activity: new FormControl('All Activity'),
      toggleBtn: new FormControl(3),
      searchvalue: new FormControl('')
    })
  }
  @ViewChild(IonModal) modal1: IonModal;

  displayStyle1 = 'none';

  displayStyle = "none";
  displayStyleForHistory = "block";

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {  
    await this.GetHistoryData();
  }

  openPopupNoteHistory() {
    if (this.isSaveLoading == false) {
      this.GetMemberNoteHistory();
      this.displayStyle1 = 'block';
      this.displayStyle = 'none';      
    }
  }
  closePopupNoteHistory() {
    if (this.isSaveLoading == false) {
      this.displayStyle1 = 'none';
      this.displayStyle = 'block';      
    }
  }

  async GetMemberNoteHistory() {
    this.notesHistory = [];
    await this.memberProfileService
      .GetMemberNoteHistoryByMemberId(this.memberID)
      .subscribe(
        (data: any) => {
          this.notesHistory = data;
          this.notesHistory.forEach((element) => {
            element.lastModifiedDate = CONSTANTS.convertISODateToLocal(
              element.lastModifiedDate
            );
          });
        },
        async (error) => {
          if (error.status != 404) {
            const toast = await this.toastCtrl.create({
              message: 'Something went wrong, Try after some time!',
              duration: 5000,
              cssClass: 'custom-toast',
            });
            toast.present();
          }
        }
      );
  }
  handleHighRollerChange(event) {
    if (event.detail.checked) {
      // If High Roller is checked, uncheck Free Player
      this.freePlayer = false;
      this.memberDetails.controls['addMemberDetails'].controls['freePlayer'].setValue('false');
    }
  }

  handleFreePlayerChange(event) {
    if (event.detail.checked) {
      // If Free Player is checked, uncheck High Roller
      this.highroller = false;
      this.memberDetails.controls['addMemberDetails'].controls['highroller'].setValue('false');
    }
  }

  formatPhoneNumber(number) {
    const cleanedNumber = number.replace(/\D/g, '');
    let num;
    if (cleanedNumber.length === 10) {
      num = `(${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(3, 6)}-${cleanedNumber.slice(6)}`;
    } else {
      num = number;
    }
    return num;
  }
  CleanPhoneNumber(number) {
    let num = number.replace(' ', '');
    num = num.replace('-', '');
    num = num.replace('(', '');
    num = num.replace(')', '');
    return num;
  }

  async GetHistoryData() {
    this.userProfile.GetActivityDashboardByBusinessID(this.businessLocationId).subscribe((data: any) => {
      this.userProfile.GetActivityTypes().subscribe((response: any) => {
        this.activityType = response;
      });

      this.historyData = data;

      this.historyData.forEach(element => {
        element.phone = element.phone.toString();
        element.phone = this.formatPhoneNumber(element.phone);
        element.datetime = CONSTANTS.convertISODateToLocal(element.datetime);
      });
      this.historyDataForFilter = this.historyData;
      if (this.historyData.length > 0) {
        this.isDataExist = true;
        this.filterData(0);
      }
      this.isLoading = false;
    },
      async (error) => {
        const toast = await this.toastCtrl.create({
          message: "Something went wrong!",
          duration: 5000,
          cssClass: 'custom-toast'
        });
        toast.present();
        this.isLoading = false;

      }
    );
  }

  filterData(type: any) {
    let a = this.HistoryFormGroup.controls['activity'].value;
    let d = this.HistoryFormGroup.controls['toggleBtn'].value;
    let searchvalue = this.HistoryFormGroup.controls['searchvalue'].value;

    let yesterday: Date = new Date();
    new Date(yesterday.setDate(yesterday.getDate() - 1));

    var first = new Date();
    first.setDate(first.getDate() - 6);
    first.setHours(0, 0, 0, 0);

    var last = new Date(new Date().setHours(0, 0, 0, 0));

    this.historyData = this.historyDataForFilter.filter(x => (a != 'All Activity' ? x.activityType == this.HistoryFormGroup.controls['activity'].value : 1)
      && (x.membername.toLowerCase().indexOf(searchvalue.toLowerCase()) > -1 || this.CleanPhoneNumber(x.phone).toLowerCase().indexOf(searchvalue.toLowerCase()) > -1)
      && (d == 1 ? (new Date(x.datetime).getDate() == new Date().getDate() && new Date(x.datetime).getMonth() == new Date().getMonth())
        : (d == 2 ? (new Date(x.datetime).getDate() == (yesterday.getDate()) && new Date(x.datetime).getMonth() == yesterday.getMonth())
          : (d == 3 ? (new Date(new Date(x.datetime).setHours(0, 0, 0, 0)) >= first && new Date(new Date(x.datetime).setHours(0, 0, 0, 0)) <= last) : 1))));

    this.totalPromoActivity = (this.historyData.filter(x => x.activityType == "Promotion Redeemed")).length;
    this.totalAPActivity = (this.historyData.filter(x => x.activityType == "Autopilot Redeemed")).length;
    this.totalRewardsEarned = (this.historyData.filter(x => x.activityType == "Rewards Redeemed")).length;
    // this.totalPointsEarned = (this.historyData.filter(x => x.activityType == "Points Earned")).length;
    this.EarnedPointSum = 0;
    this.historyData.map(x => {
      if (x.activityType == "Points Earned") {
        this.EarnedPointSum = this.EarnedPointSum + parseInt(x.points);
      }
    });

    if (type == 1) {
      this.historyData = this.historyData.filter(x => x.activityType == "Promotion Redeemed");
      this.selectedLabelClick = "Promotion Redeemed";
    }
    else if (type == 2) {
      this.historyData = this.historyData.filter(x => x.activityType == "Autopilot Redeemed");
      this.selectedLabelClick = "Autopilot Redeemed";
    }
    else if (type == 3) {
      this.historyData = this.historyData.filter(x => x.activityType == "Rewards Redeemed");
      this.selectedLabelClick = "Rewards Redeemed";
    }
    else if (type == 4) {
      this.historyData = this.historyData.filter(x => x.activityType == "Points Earned");
      this.selectedLabelClick = "Points Earned";
      this.EarnedPointSum = 0;
      this.historyData.map(x => {
        this.EarnedPointSum = this.EarnedPointSum + parseInt(x.points);
      });
    }

    if (this.historyData.length > 0) {
      this.isDataExist = true;
    }
    else {
      this.isDataExist = false;
    }
  }

  async common(type: any) {
    this.filterData(type)
    const toast = await this.toastCtrl.create({
      message: "Data Refreshed",
      duration: 1500,
      cssClass: 'custom-toast'
    });
    toast.present();
  }


  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    if (this.isSaveLoading == false) {
      this.displayStyle = "none";
      this.displayStyleForHistory = "block";      
    }
  }

  get Email() {
    return this.memberDetails.controls['addMemberDetails'].get('email');
  }

  get AddMemberDetails() {
    return this.memberDetails.controls['addMemberDetails']['controls'];
  }

  async editProfile(memberHistory: any) {
    if (memberHistory.masterMemberID <= 9 && memberHistory.masterMemberID >= 1) {
      const toast = await this.toastCtrl.create({
        message: "You can't update this member's detail!",
        duration: 2000,
        cssClass: 'custom-toast'
      });
      toast.present();
    } else {
      this.memberProfileService.GetMemberProfileByProfileID(memberHistory.memberId).subscribe((response: any) => {
        this.memberData = response;
        this.memberID = memberHistory.memberId;
        this.phoneNo = this.formatPhoneNumber(memberHistory.phone);
        this.memberSince = this.memberData[0].membersince;
        this.currentPoints = this.memberData[0].currentpoints;
        this.totalPoints = this.memberData[0].lifetimepoints;
        this.birthDate = this.memberData[0].birthDay != null ? this.memberData[0].birthDay + ' ' + this.memberData[0].birthMonth : '';
        this.memberDetails.controls['addMemberDetails'].controls['name'].setValue(this.memberData[0].name);
        this.memberDetails.controls['addMemberDetails'].controls['email'].setValue(this.memberData[0].emailId);
        this.memberDetails.controls['addMemberDetails'].controls['highroller'].setValue(this.memberData[0].isHighroller);
        this.memberDetails.controls['addMemberDetails'].controls['freePlayer'].setValue(this.memberData[0].isFreePlayer);
        this.memberDetails.controls['addMemberDetails'].controls['notes'].setValue('');
        this.oldNote = this.memberData[0].notes;

        this.displayStyle = "block";
        this.displayStyleForHistory = "none";
      });
    }
  }

  async SaveProfile() {
    if (this.Email.valid) {
      this.isSaveLoading = true;
      let UserId = Number(localStorage.getItem('userId'));
      let currentDate = CONSTANTS.ISODate();
      let data = {
        "memberId": this.memberID,
        "notes": (this.AddMemberDetails.notes.value == '' ||
        this.AddMemberDetails.notes.value == null ||
        this.AddMemberDetails.notes.value == undefined) ? this.memberData[0].notes : this.AddMemberDetails.notes.value,
        "isHighroller": this.AddMemberDetails.highroller.value,
        "isFreePlayer": this.AddMemberDetails.freePlayer.value,
        "memberName": this.AddMemberDetails.name.value,
        "emailID": this.AddMemberDetails.email.value == '' ? null : this.AddMemberDetails.email.value,
        "lastModifiedBy": UserId,
        "lastModifiedDate": currentDate
      }

      setTimeout(() => {
        this.memberProfileService.PutMemberProfileNoteInStore(data).subscribe(async (res: any) => {
          const toast = await this.toastCtrl.create({
            message: "Saved Successfully",
            duration: 1500,
            cssClass: 'custom-toast'
          });
          this.GetHistoryData();
          this.isSaveLoading = false;
          this.closePopup();
          toast.present();
        },
          async (error) => {
            const toast = await this.toastCtrl.create({
              message: "Something went wrong, Try again after some time!",
              duration: 1500,
              cssClass: 'custom-toast'
            });
            this.isSaveLoading = false;
            this.closePopup();
            toast.present();
          }
        );
      }, 1000);
    } else {
      const toast = await this.toastCtrl.create({
        message: "Please enter valid email!",
        duration: 1500,
        cssClass: 'custom-toast'
      });
      this.isSaveLoading = false;
      toast.present();
    }

  }
}