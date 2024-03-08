import { Component, OnInit } from '@angular/core';
import * as CONSTANTS from '../api/service/Constants';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  downloadProgress: number = 0;

  constructor() { }

  ngOnInit() { }

  // startDownload() {
    //   const targetPath = this.file.externalDataDirectory + 'AppName.apk';
    //   const fileTransfer: FileTransferObject = this.transfer.create();

    //   fileTransfer.onProgress((event) => {
    //     this.downloadProgress = (event.loaded / event.total) * 100;
    //   });

    //   fileTransfer.download(CONSTANTS.API_ENDPOINT + "DashBoard/Download/0025.apk", targetPath).then(
    //     async (entry) => {
    //       console.log('Download complete. File location: ' + entry.toURL());
    //       await alert('2 Download complete. File location: ' + entry.toURL());

    //       console.log(targetPath);
    //       console.log(entry.toURL());

    //       this.fileOpener.open(targetPath, 'application/vnd.android.package-archive').then(async (error) => {
    //         alert('file opened successfully');
    //       })
    //         .catch((error) => {
    //           alert(error);
    //         });

    //     },
    //     async (error) => {
    //       console.error('Download error: ' + JSON.stringify(error));
    //       await alert('3 Download error: ' + JSON.stringify(error));
    //     }
    //   );
  // }

}
