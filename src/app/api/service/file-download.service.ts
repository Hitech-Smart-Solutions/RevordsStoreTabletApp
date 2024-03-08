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

  // downloadFile(url: string, targetPath: string): FileTransferObject {
  //   const fileTransfer: FileTransferObject = this.fileTransfer.create();

  //   fileTransfer.onProgress(async (event) => {
  //     const downloadProgress = (event.loaded / event.total) * 100;
  //     // You can update the progress bar here
  //     console.log(`Download Progress: ${downloadProgress}%`);
  //     await alert(`1 Download Progress: ${downloadProgress}%`);
  //   });

  //   fileTransfer.download(url, targetPath).then(
  //     async (entry) => {
  //       // File download completed
  //       console.log('Download complete. File location: ' + entry.toURL());
  //       await alert('2 Download complete. File location: ' + entry.toURL());
  //     },
  //     async (error) => {
  //       // Handle download errors here
  //       console.error('Download error: ' + JSON.stringify(error));
  //       await alert('3 Download error: ' + JSON.stringify(error));
  //     }
  //   );

  //   setTimeout(() => {

  //   }, 10000);

  //   alert('4')
  //   alert(fileTransfer)
  //   return fileTransfer;
  // }

  downloadAPK(fileName: any) {
    return this.http.get<any>(CONSTANTS.API_ENDPOINT + "DashBoard/Download/" + fileName)
      .pipe(map(member => {
        return member;
      }));
  }

}