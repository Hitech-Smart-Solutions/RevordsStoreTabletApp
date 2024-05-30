import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersVistLog } from '../api/service/model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { MemberProfileService } from '../api/service/memberProfileService';
import { ToastController } from '@ionic/angular';
import * as CONSTANTS from '../api/service/Constants';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
})
export class Tab5Page {
  newMemberPhone: number;
  newMemberName: any;
  newMemberEmail: any;
  newMemberBdate: any;
  newMemberNote: any;
  step: any = 1;
  monthlist: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  multistep = new FormGroup({
    addNumberDetails: new FormGroup({
      display: new FormControl('', Validators.required),
    }),
    addMemberDetails: new FormGroup({
      name: new FormControl(''),
      email: new FormControl(
        '',
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ),
      monthID: new FormControl(''),
      dayID: new FormControl(''),
      note: new FormControl(''),
      highroller: new FormControl(false),
      freePlayer: new FormControl(false),
      isOverAged: new FormControl(false),
    }),
  });

  isLoading = false;
  showData = true;
  memberDataExist: any;
  memberProfileExist: any;
  businessLocationId = Number(localStorage.getItem('businessLocationId'));
  businessGroupId = Number(localStorage.getItem('businessGroupId'));
  sourceId = Number(localStorage.getItem('sourceId'));
  userId = Number(localStorage.getItem('userId'));
  isAgeRestriction: boolean;
  memberVisitLogRes: any;
  newMemberProfileRes: any;
  phoneNumber: any;
  signInLog: any = [];
  days: number[];
  isMonthSelect: any = false;
  positiveFlagRequired: any = false;
  positiveFlagName: any;
  negativeFlagName: any;
  dynamicField: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private member: MembersVistLog,
    private router: Router,
    private userProfile: GetUserProfileService,
    private memberProfileService: MemberProfileService,
    private toastCtrl: ToastController,
    private memberVisitLogService: MemberProfileService
  ) {
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);

    this.userProfile
      .GetBusinessGroupByID(this.businessGroupId)
      .subscribe((data: any) => {
        this.positiveFlagRequired = data.positiveFlagRequired;
        this.positiveFlagName = data.positiveFlagName;
        this.negativeFlagName = data.negativeFlagName;
      });
  }

  ionViewWillEnter() {
    this.GetDynamicFieldsByBusinessGroupId();

    this.userProfile
      .GetBusinessProfilesByID(this.businessLocationId)
      .subscribe((data: any) => {
        this.isAgeRestriction = data.isAgeRestriction;
      });
  }

  ngOnInit() {}

  displayStyle = 'none';
  displayStyleForGuest = 'none';

  handleHighRollerChange(event) {
    if (event.detail.checked) {
      // If High Roller is checked, uncheck Free Player
      this.multistep.controls['addMemberDetails'].controls[
        'freePlayer'
      ].setValue(false);
    }
  }

  handleFreePlayerChange(event) {
    if (event.detail.checked) {
      // If Free Player is checked, uncheck High Roller
      this.multistep.controls['addMemberDetails'].controls[
        'highroller'
      ].setValue(false);
    }
  }

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }

  openGuestPopup() {
    this.displayStyleForGuest = 'block';
  }
  closeGuestPopup() {
    this.displayStyleForGuest = 'none';
  }

  async signInGuest() {
    this.closeGuestPopup();

    this.userProfile
      .PostAnonymousMemberVisitLog(
        this.businessGroupId,
        this.businessLocationId,
        this.sourceId,
        this.userId
      )
      .subscribe(
        async (res: any) => {
          this.router.navigate(['tab2']);
          const toast = await this.toastCtrl.create({
            message: 'New Guest Added',
            duration: 2500,
            cssClass: 'custom-toast',
          });
          toast.present();
        },
        async (error) => {
          this.closeGuestPopup();
          this.router.navigate(['tab2']);
          if (error.status == 404) {
            const toast = await this.toastCtrl.create({
              message:
                'To add a new guest, kindly sign out of any existing guest member!',
              duration: 2500,
              cssClass: 'custom-toast',
            });
            toast.present();
          }
        }
      );
  }

  onMonthChange() {
    if (
      this.AddMemberDetails.monthID.value != '' &&
      this.AddMemberDetails.monthID.value != null &&
      this.AddMemberDetails.monthID.value != undefined
    ) {
      this.isMonthSelect = true;
      this.multistep.controls['addMemberDetails'].controls['dayID'].setValue(
        ''
      );

      switch (this.AddMemberDetails.monthID.value) {
        case 'February':
          this.days = Array.from({ length: 29 }, (_, i) => i + 1);
          break;
        case 'April':
        case 'June':
        case 'September':
        case 'November':
          this.days = Array.from({ length: 30 }, (_, i) => i + 1);
          break;
        default:
          this.days = Array.from({ length: 31 }, (_, i) => i + 1);
          break;
      }
    }
  }

  GetBack() {
    this.isLoading = true;
    this.showData = false;
    setTimeout(() => {
      this.router.navigate(['tab2']);
      this.isLoading = false;
      this.showData = true;
    }, 500);
  }

  get AddNumberDetails() {
    return this.multistep.controls['addNumberDetails']['controls'];
  }
  get AddMemberDetails() {
    return this.multistep.controls['addMemberDetails']['controls'];
  }

  get Email() {
    return this.multistep.controls['addMemberDetails'].get('email');
  }

  async back() {
    this.step = this.step - 1;
  }

  async next() {
    if (
      /^([0-9])\1*$/.test(this.AddNumberDetails.display.value) &&
      this.AddNumberDetails.display.value.length == 10
    ) {
      const toast = await this.toastCtrl.create({
        message:
          "You're trying to Signin Guest, Click Add Guest for Signin guest member!",
        duration: 3000,
        cssClass: 'custom-toast',
      });
      toast.present();
    } else {
      if (
        /^[0][0-9]/.test(this.AddNumberDetails.display.value) ||
        this.AddNumberDetails.display.value.length < 10
      ) {
        const toast = await this.toastCtrl.create({
          message: 'Please Enter a Valid Number',
          duration: 2500,
          cssClass: 'custom-toast',
        });
        toast.present();
      } else {
        this.isLoading = true;
        if (
          this.multistep.controls['addNumberDetails'].invalid &&
          this.step == 1
        ) {
          return;
        }

        this.newMemberPhone = Number(this.AddNumberDetails.display.value);

        this.memberProfileService
          .GetMemberExistByPhoneNo(this.newMemberPhone)
          .subscribe(
            (res: any) => {
              this.memberDataExist = res;
              this.memberProfileService
                .GetMemberProfileByPhoneNo(
                  this.businessGroupId,
                  this.businessLocationId,
                  this.newMemberPhone
                )
                .subscribe(
                  (resProfile: any) => {
                    this.memberProfileExist = resProfile;

                    this.userProfile
                      .GetMemberBySignout(
                        this.businessLocationId,
                        this.sourceId
                      )
                      .subscribe((data: any) => {
                        this.signInLog = data;
                        let signInId: Array<number> = [];

                        this.signInLog.forEach((element: any) => {
                          signInId.push(element.memberId);
                        });

                        if (signInId.includes(this.memberProfileExist[0].id)) {
                          this.isLoading = false;
                          this.DisplayToastSignIn();
                        } else {
                          let currentDate = CONSTANTS.ISODate();
                          this.member.MemberId = this.memberProfileExist[0].id;
                          this.member.SignIn = currentDate;
                          this.member.SourceId = this.sourceId;
                          this.member.BusinessLocationId =
                            this.businessLocationId;
                          this.member.StateId = 3;
                          this.member.IsActive = true;
                          this.member.CreatedBy = 1;
                          this.member.CreatedDate = currentDate;
                          this.member.LastModifiedBy = 1;
                          this.member.LastModifiedDate = currentDate;

                          this.userProfile
                            .PostMemberVisitLog(this.member)
                            .subscribe((data) => {
                              this.memberVisitLogRes = data;
                              this.isLoading = false;
                              if (this.memberVisitLogRes.id > 0) {
                                this.router.navigate(['/tab2']);
                              }
                            });
                        }
                      });
                  },
                  async (error) => {
                    if (error.status == 404) {
                      let currentDate = CONSTANTS.ISODate();
                      let newMemberProfileData = {
                        uniqueId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                        id: 0,
                        memberId: this.memberDataExist[0].memberId,
                        notes: '',
                        badgeId: 1,
                        tagId: 0,
                        businessGroupId: this.businessGroupId,
                        lastVisitDate: null,
                        lifeTimePoints: 0,
                        lifeTimeVisits: 0,
                        smsoptIn: false,
                        emailOptIn:
                          this.memberDataExist[0].emailId == '' ||
                          this.memberDataExist[0].emailId == null ||
                          this.memberDataExist[0].emailId == undefined
                            ? false
                            : true,
                        notificationOptIn: false,
                        currentPoints: 0,
                        sourceId: this.sourceId,
                        stateId: 3,
                        isActive: true,
                        createdBy: 1,
                        createdDate: currentDate,
                        lastModifiedBy: 1,
                        lastModifiedDate: currentDate,
                        isHighroller: this.AddMemberDetails.highroller.value,
                        isFreePlayer: this.AddMemberDetails.freePlayer.value,
                        businessLocationID: this.businessLocationId,
                        baseLocationID: this.businessLocationId,
                      };

                      this.memberProfileService
                        .PostMemberProfile(newMemberProfileData)
                        .subscribe((res: any) => {
                          this.newMemberProfileRes = res;
                          let currentDate = CONSTANTS.ISODate();
                          this.member.MemberId = res.id;
                          this.member.SignIn = currentDate;
                          this.member.SourceId = this.sourceId;
                          this.member.BusinessLocationId =
                            this.businessLocationId;
                          this.member.StateId = 3;
                          this.member.IsActive = true;
                          this.member.CreatedBy = 1;
                          this.member.CreatedDate = currentDate;
                          this.member.LastModifiedBy = 1;
                          this.member.LastModifiedDate = currentDate;

                          this.userProfile
                            .PostMemberVisitLog(this.member)
                            .subscribe((data) => {
                              this.memberVisitLogRes = data;
                              this.isLoading = false;
                              if (this.memberVisitLogRes.id > 0) {
                                this.router.navigate(['/tab2']);
                              }
                            });
                        });
                    } else {
                      const toast = await this.toastCtrl.create({
                        message:
                          'Something went wrong, Try again after some time!',
                        duration: 5000,
                        cssClass: 'custom-toast',
                      });
                      toast.present();
                    }
                  }
                );
            },
            async (error) => {
              if (error.status == 404) {
                this.step = this.step + 1;
                this.isLoading = false;
              } else {
                const toast = await this.toastCtrl.create({
                  message: 'Something went wrong, Try again after some time!',
                  duration: 5000,
                  cssClass: 'custom-toast',
                });
                toast.present();
              }
            }
          );
      }
    }
  }

  async DisplayToastSignIn() {
    const toast = await this.toastCtrl.create({
      message: 'Member is already Sign In!',
      duration: 3500,
      cssClass: 'custom-toast',
    });
    toast.present();
  }

  async submitData() {
    this.isLoading = true;
    this.closePopup();
    let currentYear = new Date().getFullYear();
    let currentDate = CONSTANTS.ISODate();
    let newMemberData = {
      uniqueID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      id: 0,
      memberName:
        this.AddMemberDetails.name.value == '' ||
        this.AddMemberDetails.name.value == null ||
        this.AddMemberDetails.name.value == undefined
          ? 'USER ' +
            Number(this.AddNumberDetails.display.value)
              .toString()
              .substring(5, 10)
          : this.AddMemberDetails.name.value,
      birthDate:
        this.AddMemberDetails.dayID.value == '' ||
        this.AddMemberDetails.monthID.value == '' ||
        this.AddMemberDetails.dayID.value == null ||
        this.AddMemberDetails.monthID.value == null ||
        this.AddMemberDetails.dayID.value == undefined ||
        this.AddMemberDetails.monthID.value == undefined
          ? null
          : `${currentYear}-${this.AddMemberDetails.monthID.value}-${this.AddMemberDetails.dayID.value}`,
      emailID:
        this.AddMemberDetails.email.value == '' ||
        this.AddMemberDetails.email.value == null ||
        this.AddMemberDetails.email.value == undefined
          ? null
          : this.AddMemberDetails.email.value,
      phoneNo: Number(this.AddNumberDetails.display.value),
      isActive: true,
      createdBy: 1,
      createdDate: currentDate,
      lastModifiedBy: 1,
      lastModifiedDate: currentDate,
      businessLocationId: this.businessLocationId,
      memberProfile: [
        {
          uniqueId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          id: 0,
          memberId: 0,
          notes: this.AddMemberDetails.note.value
            ? this.AddMemberDetails.note.value
            : null,
          badgeId: 1,
          tagId: null,
          businessGroupId: this.businessGroupId,
          lastVisitDate: null,
          lifeTimePoints: 0,
          lifeTimeVisits: 0,
          smsoptIn: false,
          emailOptIn:
            this.AddMemberDetails.email.value == '' ||
            this.AddMemberDetails.email.value == null ||
            this.AddMemberDetails.email.value == undefined
              ? false
              : true,
          notificationOptIn: false,
          currentPoints: 0,
          sourceId: this.sourceId,
          stateId: 3,
          isActive: true,
          createdBy: 1,
          createdDate: currentDate,
          lastModifiedBy: 1,
          lastModifiedDate: currentDate,
          isHighroller: this.AddMemberDetails.highroller.value,
          isFreePlayer: this.AddMemberDetails.freePlayer.value,
          baseLocationID: this.businessLocationId,
          isOverAged:
            this.isAgeRestriction == true
              ? this.AddMemberDetails.isOverAged.value
              : false,
        },
      ],
    };

    setTimeout(() => {
      this.memberProfileService.PostNewMemberInStore(newMemberData).subscribe(
        async (res: any) => {
          this.router.navigate(['tab2']);
          const toast = await this.toastCtrl.create({
            message: 'New Member Added',
            duration: 2500,
            cssClass: 'custom-toastSuccess',
          });
          toast.present();
          this.isLoading = false;
        },
        async (error) => {
          if (error.status == 409) {
            const toast = await this.toastCtrl.create({
              message: 'Member is already exist, Please Signin again!',
              duration: 2500,
              cssClass: 'custom-toast',
            });
            this.isLoading = false;
            toast.present();
          } else {
          }
          const toast = await this.toastCtrl.create({
            message: 'Something went wrong, Try again!',
            duration: 2500,
            cssClass: 'custom-toast',
          });
          this.isLoading = false;
          toast.present();
        }
      );
    }, 1000);
  }

  async submit() {
    if (this.multistep.controls['addMemberDetails'].valid) {
      if (this.isAgeRestriction == true) {
        if (this.AddMemberDetails.isOverAged.value?.toString() == 'true') {
          this.submitData();
        } else {
          this.closePopup();
          const toast = await this.toastCtrl.create({
            message:
              'Please confirm that Member is at least 21 years old to proceed!',
            duration: 2000,
            cssClass: 'custom-toastDanger',
          });
          toast.present();
        }
      } else {
        this.submitData();
      }
    } else {
      this.closePopup();
      const toast = await this.toastCtrl.create({
        message: 'Please enter valid email!',
        duration: 3500,
        cssClass: 'custom-toast',
      });
      toast.present();
    }
  }

  previous() {
    this.step = this.step - 1;
  }

  click(val: any) {
    switch (val) {
      case 'delete-left':
        if (this.AddNumberDetails.display.value) {
          let displayLength = this.AddNumberDetails.display.value.length;
          let a = this.AddNumberDetails.display.value.substring(
            0,
            displayLength - 1
          );
          this.multistep.controls['addNumberDetails'].controls[
            'display'
          ].setValue(a);

          let len = this.phoneNumber.length;
          if (len == 11) {
            this.phoneNumber = this.phoneNumber.substr(
              0,
              this.phoneNumber.length - 2
            );
          } else if (len == 7) {
            this.phoneNumber = this.phoneNumber.substr(
              0,
              this.phoneNumber.length - 2
            );
          } else if (len == 5) {
            this.phoneNumber = this.phoneNumber.substr(
              0,
              this.phoneNumber.length - 2
            );
          } else if (len == 2) {
            this.phoneNumber = '';
            this.multistep.controls['addNumberDetails'].controls[
              'display'
            ].setValue('');
          } else {
            this.phoneNumber = this.phoneNumber.substr(
              0,
              this.phoneNumber.length - 1
            );
          }
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
    let len = this.AddNumberDetails.display.value.length;

    if (len >= 10) {
      let number = this.AddNumberDetails.display.value;
      this.multistep.controls['addNumberDetails'].controls['display'].setValue(
        number
      );
    } else {
      let number = this.AddNumberDetails.display.value + nbr;
      this.multistep.controls['addNumberDetails'].controls['display'].setValue(
        number
      );
    }

    if (len == 0) {
      this.phoneNumber = '(' + nbr;
    } else if (len == 2) {
      this.phoneNumber += nbr + ')';
    } else if (len == 3) {
      this.phoneNumber += ' ' + nbr;
    } else if (len == 6) {
      this.phoneNumber += '-' + nbr;
    } else if (len == 10) {
      this.phoneNumber = this.phoneNumber;
    } else {
      this.phoneNumber += nbr;
    }
  }

  GetDynamicFieldsByBusinessGroupId() {
    localStorage.removeItem('DynamicField');
    this.userProfile
      .GetDynamicFieldsByBusinessGroupId(this.businessGroupId)
      .subscribe(async (data: any) => {
        localStorage.setItem('DynamicField', JSON.stringify(data));
        this.dynamicField = JSON.parse(
          localStorage.getItem('DynamicField') || '{}'
        );
      });
  }
}
