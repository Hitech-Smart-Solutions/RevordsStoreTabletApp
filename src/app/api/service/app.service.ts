import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private data = new BehaviorSubject(null);
  getData = this.data.asObservable();
  
  constructor() {}
  
  setData (data: any){
    this.data.next(data);
  }
}
