import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import * as CONSTANTS from './Constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  constructor(private fileTransfer: FileTransfer,private http: HttpClient) { }

  downloadAPK(fileName: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "DashBoard/Download/" + fileName)
      .pipe(map(member => {
        return member;
      }));
  }

}