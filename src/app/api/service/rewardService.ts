import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  constructor(private http: HttpClient) { }

  GetRewardConfigByBusinessGroupId(businessGroupId: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "RewardConfigs/GetRewardConfigByBusinessGroupId/" + businessGroupId)
      .pipe(map(member => {
        return member;
      }));
  }
}
