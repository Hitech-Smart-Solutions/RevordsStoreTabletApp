import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  GetLatestStoreTabletAppVersion() {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "DashBoard/GetLatestStoreTabletAppVersion")
      .pipe(map(member => {
        return member;
      }));
  }
}
