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

  PostMemberVisitLog(membersVistLog: MembersVistLog) {
    return this.http.post<MembersVistLog>(CONSTANTS.API_ENDPOINT + `MembersVistLogs`, membersVistLog).pipe(map(data => {
      return data;
    }));
  }  

  GetSpinWheelConfigByMemberIDBusinessLocationID(memberID: any, businessLocationID: any, tabletFlag: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + `SpinWheelDefaultConfigurationHeaders/GetSpinWheelConfigByMemberIDBusinessLocationID/${memberID}/${businessLocationID}/${tabletFlag}`).pipe(map(data => {
      return data;
    }));
  }
  
  GetSpinWheelTextByMemberId(BusinessLocationID: any, MemberId: any, Date: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `SpinWheelDefaultConfigurationHeaders/GetSpinWheelTextByMemberId/${BusinessLocationID}/${MemberId}/${Date}`);
  }

  GetAutopilotByMemberId(BusinessGroupId: any, MemberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `AutoPilotConfigs/GetAutopilotByMemberId/${BusinessGroupId}/${MemberId}`);
  }

  GetActivityDashboardByBusinessID(businessLocationId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `ActivityHistories/GetActivityDashboardByBusinessLocationId/${businessLocationId}`);
  }

  GetActivityTypes() {
    return this.http.get(CONSTANTS.API_ENDPOINT + `ActivityTypes`);
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

  GetBusinessGroupByID(businessGroupID: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "BusinessGroups/GetBusinessGroupByID/" + businessGroupID)
      .pipe(map(data => {
        return data;
      }));
  }

  GetDynamicFieldsByBusinessGroupId(businessGroupID: any) {
    return this.http
      .get<any>(
        CONSTANTS.API_ENDPOINT +
          'GroupWiseDynamicFields/GetDynamicFieldsByBusinessGroupId/' +
          businessGroupID
      )
      .pipe(
        map((member) => {
          return member;
        })
      );
  }
}
