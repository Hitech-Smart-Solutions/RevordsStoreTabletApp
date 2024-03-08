import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  constructor(private http: HttpClient) { }

  GetAnnouncementsByBusinessLocationID(businessLocationID: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "Announcements/GetAnnouncementsByBusinessLocationID/" + businessLocationID)
      .pipe(map(member => {
        return member;
      }));
  }
}
