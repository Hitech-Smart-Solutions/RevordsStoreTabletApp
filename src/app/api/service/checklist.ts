import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONSTANTS from './Constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  constructor(private http: HttpClient) { }

  GetChecklistByBusinessGroupID(businessGroupID: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "Checklists/GetChecklistByBusinessGroupID/" + businessGroupID)
      .pipe(map(member => {
        return member;
      }));
  }
}
