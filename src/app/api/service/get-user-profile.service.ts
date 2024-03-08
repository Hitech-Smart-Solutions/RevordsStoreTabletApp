import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { map } from 'rxjs';
import { MembersVistLog } from './model';

@Injectable({
  providedIn: 'root'
})
export class GetUserProfileService {

  constructor(private http: HttpClient) { }

  Users(Email: any, Password: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "Users/" + Email + "/" + Password)
      .pipe(map(member => {
        return member;
      }));
  }

  GetMemberBySignout(BusinessLocationId: any, SourceId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MembersVistLogs/GetMemberVistLogByBusinessLocationId/${BusinessLocationId}/${SourceId}`);
  }

  GetMemberExistByPhoneNo(phoneNo: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MemberProfiles/GetMemberByPhoneNo/${phoneNo}`);
  }

  GetMemberProfileByPhoneNo(businessGroupId: any, phoneNo: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MemberProfiles/GetMemberProfileByPhoneNo/${businessGroupId}/${phoneNo}`);
  }

  PostMemberVisitLog(membersVistLog: MembersVistLog) {
    return this.http.post<MembersVistLog>(CONSTANTS.API_ENDPOINT + `MembersVistLogs`, membersVistLog).pipe(map(data => {
      return data;
    }));
  }

  PutMemberProfileNoteInStore(data: any) {
    return this.http.put(CONSTANTS.API_ENDPOINT + `MemberProfiles/PutMemberProfileNoteInStore`, data).pipe(map(res => {
      return res;
    }));
  }

  UpdateRewardsInStore(data: any) {
    return this.http.put(CONSTANTS.API_ENDPOINT + 'Promotions/UpdateRewardsInStore', data).pipe(map(res => {
      return res;
    }));
  }

  UpdateRedeemRewardsInStore(data: any) {
    return this.http.put(CONSTANTS.API_ENDPOINT + 'Promotions/UpdateRedeemRewardsInStore', data).pipe(map(res => {
      return res;
    }));
  }

  GetSpinWheelConfigByMemberIDBusinessGroupID(memberID: any, businessGroupID: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + `SpinWheelDefaultConfigurationHeaders/GetSpinWheelConfigByMemberIDBusinessGroupID/${memberID}/${businessGroupID}`).pipe(map(data => {
      return data;
    }));
  }
  
  GetSpinWheelTextByMemberId(BusinessLocationID: any, MemberId: any, Date: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `SpinWheelDefaultConfigurationHeaders/GetSpinWheelTextByMemberId/${BusinessLocationID}/${MemberId}/${Date}`);
  }

  GetPromotionsByMemberId(BusinessLocationID: any, MemberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `Promotions/GetPromotionsByMemberId/${BusinessLocationID}/${MemberId}`);
  }

  GetAutopilotByMemberId(BusinessGroupId: any, MemberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `AutoPilotConfigs/GetAutopilotByMemberId/${BusinessGroupId}/${MemberId}`);
  }

  GetRewardByMemberId(BusinessGroupId: any, MemberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `RewardConfigs/GetRewardForReedimtionBusinesswiseMemberwise/${BusinessGroupId}/${MemberId}`);
  }

  PostNewMemberInStore(newMemberData: any) {
    return this.http.post(CONSTANTS.API_ENDPOINT + 'MemberProfiles/PostNewMemberInStore', newMemberData).pipe(map(data => {
      return data;
    }));
  }

  PostMemberProfile(newMemberProfileData: any) {
    return this.http.post(CONSTANTS.API_ENDPOINT + 'MemberProfiles', newMemberProfileData).pipe(map(data => {
      return data;
    }));
  }

  GetActivityDashboardByBusinessID(businessLocationId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `ActivityHistories/GetActivityDashboardByBusinessLocationId/${businessLocationId}`);
  }

  GetActivityTypes() {
    return this.http.get(CONSTANTS.API_ENDPOINT + `ActivityTypes`);
  }

  GetMemberNoteHistoryByMemberId(MemberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MemberProfiles/GetMemberNoteHistoryByMemberId/${MemberId}`);
  }

  GetRedeemRewardCount(businessLocationId: any, sourceId: any, memberID: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `ActivityHistories/GetRedeemRewardCount/${businessLocationId}/${sourceId}/${memberID}`);
  }

  PostAnonymousMemberVisitLog(businessGroupID: any, businessLocationID: any, sourceId: any, userId: any) {
    return this.http.post(CONSTANTS.API_ENDPOINT + `MembersVistLogs/PostAnonymousMemberVisitLog/${businessGroupID}/${businessLocationID}/${sourceId}/${userId}`, null).pipe(map(data => {
      return data;
    }));
  }

  GetBusinessProfilesByID(id: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + `BusinessProfiles/` + id).pipe(map(data => {
      return data;
    }));
  }

  GetMemberProfileByProfileID(memberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MemberProfiles/GetMemberProfileByProfileID/${memberId}`);
  }
}
