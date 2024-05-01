import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberProfileService {
  constructor(private http: HttpClient) { }

  GetMemberExistByPhoneNo(phoneNo: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MemberProfiles/GetMemberByPhoneNo/${phoneNo}`);
  }

  GetMemberProfileByPhoneNo(businessGroupId: any, businessLocationID:any, phoneNo: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MemberProfiles/GetMemberProfileByPhoneNo/${businessGroupId}/${businessLocationID}/${phoneNo}`);
  }

  PutMemberProfileNoteInStore(data: any) {
    return this.http.put(CONSTANTS.API_ENDPOINT + `MemberProfiles/PutMemberProfileNoteInStore`, data).pipe(map(res => {
      return res;
    }));
  }

  PostNewMemberInStore(newMemberData: any) {
    return this.http.post(CONSTANTS.API_ENDPOINT + 'MemberProfiles/PostNewMemberInStore', newMemberData).pipe(map(data => {
      return data;
    }));
  }

  GetMemberNoteHistoryByMemberId(MemberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MemberProfiles/GetMemberNoteHistoryByMemberId/${MemberId}`);
  }

  GetMemberProfileByProfileID(memberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MemberProfiles/GetMemberProfileByProfileID/${memberId}`);
  }

  PostMemberProfile(newMemberProfileData: any) {
    return this.http.post(CONSTANTS.API_ENDPOINT + 'MemberProfiles', newMemberProfileData).pipe(map(data => {
      return data;
    }));
  }
}
