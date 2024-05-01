import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { IonModal, ToastController } from '@ionic/angular';
import * as CONSTANTS from '../api/service/Constants';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MemberProfileService } from '../api/service/memberProfileService';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  businessGroupId: any;
  businessLocationId: any;
  member: any;
  memberProfile: any = [];
  phoneNo: any;
  numP1: any;
  numP2: any;
  numP3: any;
  Notes: any;
  membername: any;
  email: any;
  highroller: boolean = false;
  freePlayer: boolean = false;
  isLoading = false;
  showData = true;
  notesHistory: any;
  CountPromotion: any = 0;
  positiveFlagRequired: any = false;
  positiveFlagName: any;
  negativeFlagName: any;
  memberDetails = new FormGroup({
    addMemberDetails: new FormGroup({
      name: new FormControl(''),
      email: new FormControl(
        '',
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ),
      highroller: new FormControl(''),
      freePlayer: new FormControl(''),
      notes: new FormControl(''),
    }),
  });
  oldNote: any;
  disableSaveBtn: any = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private userProfile: GetUserProfileService,
    private toastCtrl: ToastController,
    private memberProfileService: MemberProfileService
  ) {
    this.businessGroupId = localStorage.getItem('businessGroupId');
    this.businessLocationId = localStorage.getItem('businessLocationId');

    this.userProfile
      .GetBusinessGroupByID(this.businessGroupId)
      .subscribe((data: any) => {
        this.positiveFlagRequired = data.positiveFlagRequired;
        this.positiveFlagName = data.positiveFlagName;
        this.negativeFlagName = data.negativeFlagName;
      });
  }
  @ViewChild(IonModal) modal: IonModal;

  displayStyle = 'none';

  handleHighRollerChange(event) {
    if (event.detail.checked) {
      // If High Roller is checked, uncheck Free Player
      this.freePlayer = false;
      this.memberDetails.controls['addMemberDetails'].controls[
        'freePlayer'
      ].setValue('false');
    }
  }

  handleFreePlayerChange(event) {
    if (event.detail.checked) {
      // If Free Player is checked, uncheck High Roller
      this.highroller = false;
      this.memberDetails.controls['addMemberDetails'].controls[
        'highroller'
      ].setValue('false');
    }
  }

  openPopup() {
    this.GetMemberNoteHistory();
    this.disableSaveBtn = true;
    this.displayStyle = 'block';
  }
  closePopup() {
    this.disableSaveBtn = false;
    this.displayStyle = 'none';
  }

  get AddMemberDetails() {
    return this.memberDetails.controls['addMemberDetails']['controls'];
  }

  get Email() {
    return this.memberDetails.controls['addMemberDetails'].get('email');
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params['memberData']) {
        this.memberProfile = JSON.parse(params['memberData']);
        if (
          this.memberProfile != undefined &&
          this.memberProfile != null &&
          this.memberProfile != ''
        ) {
          this.member = this.memberProfile;
        }
      }

      if (params && params['CountPromotion']) {
        if (
          params['CountPromotion'] != undefined &&
          params['CountPromotion'] != null &&
          params['CountPromotion'] != ''
        ) {
          this.CountPromotion = parseInt(params['CountPromotion']);
        }
      }
    });

    this.memberDetails.controls['addMemberDetails'].controls['name'].setValue(
      this.member.memberName
    );
    this.memberDetails.controls['addMemberDetails'].controls['email'].setValue(
      this.member.email
    );
    this.memberDetails.controls['addMemberDetails'].controls[
      'highroller'
    ].setValue(this.member.isHighroller);
    this.memberDetails.controls['addMemberDetails'].controls[
      'freePlayer'
    ].setValue(this.member.isFreePlayer);
    // this.memberDetails.controls['addMemberDetails'].controls['notes'].setValue(
    //   this.member.notes
    // );
    this.oldNote = this.member.notes;
    this.numP1 = this.member.phoneNo.toString().substring(0, 3);
    this.numP2 = this.member.phoneNo.toString().substring(3, 6);
    this.numP3 = this.member.phoneNo.toString().substring(6);

    this.phoneNo = '';
    if (
      this.member.phoneNo == null ||
      this.member.phoneNo == undefined ||
      this.member.phoneNo == '' ||
      this.member.phoneNo == '0'
    ) {
      this.phoneNo = this.member.phoneNo;
    } else {
      this.phoneNo = '(' + this.numP1 + ') ' + this.numP2 + '-' + this.numP3;
    }
  }

  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }

  async GetMemberNoteHistory() {
    this.notesHistory = [];
    await this.memberProfileService
      .GetMemberNoteHistoryByMemberId(this.member.memberId)
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

  GetBack() {
    if (this.disableSaveBtn == false) {
      this.isLoading = true;
      this.showData = false;

      this.member.isHighroller = this.AddMemberDetails.highroller.value;
      this.member.isFreePlayer = this.AddMemberDetails.freePlayer.value;
      // this.member.notes = this.AddMemberDetails.notes.value;

      let navigationExtras: NavigationExtras = {
        queryParams: {
          memberData: JSON.stringify(this.member),
          CountPromotion: this.CountPromotion,
        },
      };
      this.router.navigate(['tab2/redeemRewards'], navigationExtras);
      this.isLoading = false;
      this.showData = true;
    }
  }

  async SaveProfile() {
    if (this.disableSaveBtn == false) {
      if (this.Email.valid) {
        let UserId = Number(localStorage.getItem('userId'));
        let data = {
          memberId: this.member.memberId,
          notes:
            this.AddMemberDetails.notes.value == '' ||
            this.AddMemberDetails.notes.value == null ||
            this.AddMemberDetails.notes.value == undefined
              ? this.member.notes
              : this.AddMemberDetails.notes.value,
          isHighroller: this.AddMemberDetails.highroller.value,
          isFreePlayer: this.AddMemberDetails.freePlayer.value,
          memberName: this.AddMemberDetails.name.value,
          emailID:
            this.AddMemberDetails.email.value == ''
              ? null
              : this.AddMemberDetails.email.value,
          lastModifiedBy: UserId,
          lastModifiedDate: CONSTANTS.ISODate(),
        };
        this.isLoading = true;
        this.showData = false;

        setTimeout(() => {
          this.memberProfileService.PutMemberProfileNoteInStore(data).subscribe(
            async (res: any) => {
              const toast = await this.toastCtrl.create({
                message: 'Saved Successfully',
                duration: 1500,
                cssClass: 'custom-toast',
              });
              this.showData = true;
              this.router.navigate(['tab2']);
              this.isLoading = false;
              toast.present();
            },
            async (error) => {
              const toast = await this.toastCtrl.create({
                message: 'Something went wrong, Try again after some time!',
                duration: 1500,
                cssClass: 'custom-toast',
              });
              this.showData = true;
              this.isLoading = false;
              toast.present();
            }
          );
        }, 1000);
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Please enter valid email!!',
          duration: 1500,
          cssClass: 'custom-toast',
        });
        toast.present();
      }
    }
  }
}

interface Person {
  name: string;
  age: number;
}
