import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetAllDataService {

  constructor(private http:Http) { }

  getAllData(){
    let ep = 'http://192.168.43.216:1888/inventory/getAllItems';
    return this.http.get(ep)
      .map(res => res.json());
  }
}
