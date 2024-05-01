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

}
