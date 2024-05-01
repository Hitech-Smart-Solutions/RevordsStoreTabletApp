import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(private http: HttpClient) { }

  GetPromotionsByBusinessLocationID(businessLocationID: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "Promotions/GetPromotionsByBusinessLocationID/" + businessLocationID)
      .pipe(map(member => {
        return member;
      }));
  }

  GetPromotionsByMemberId(BusinessLocationID: any, MemberId: any) {
    return this.http.get(CONSTANTS.API_ENDPOINT + `Promotions/GetPromotionsByMemberId/${BusinessLocationID}/${MemberId}`);
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
}
