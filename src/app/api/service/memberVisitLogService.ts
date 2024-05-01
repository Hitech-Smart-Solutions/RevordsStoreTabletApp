import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { map } from 'rxjs';
import { MembersVistLog } from './model';

@Injectable({
  providedIn: 'root'
})
export class MemberVisitLogService {
  constructor(private http: HttpClient) { }

  GetMemberBySignout(BusinessLocationId: any, SourceId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `MembersVistLogs/GetMemberVistLogByBusinessLocationId/${BusinessLocationId}/${SourceId}`);
  }

  PostMemberVisitLog(membersVistLog: MembersVistLog) {
    return this.http.post<MembersVistLog>(CONSTANTS.API_ENDPOINT + `MembersVistLogs`, membersVistLog).pipe(map(data => {
      return data;
    }));
  } 
  
  PostAnonymousMemberVisitLog(businessGroupID: any, businessLocationID: any, sourceId: any, userId: any) {
    return this.http.post(CONSTANTS.API_ENDPOINT + `MembersVistLogs/PostAnonymousMemberVisitLog/${businessGroupID}/${businessLocationID}/${sourceId}/${userId}`, null).pipe(map(data => {
      return data;
    }));
  }
}
