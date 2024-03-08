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
}
