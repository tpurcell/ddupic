import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Ddupic} from './ddupic';

@Injectable({
  providedIn: 'root'
})
export class DdupicService {
  ddupic: Ddupic;

  constructor(
    private http: HttpClient,
  ) {
  }

  runDdupic(name: string, path: string) {
    const now = Date.now();
    this.ddupic = {
      ddupicName: name,
      ddupicPath: path,
      createdAt: now,
      updatedAt: now,
      ddupicItems: []
    };

    this.http.post(`/assets/${this.ddupic.ddupicName}`, this.ddupic);
    console.log(`done: ${JSON.stringify(this.ddupic)}`);
  }

  getDdupic(ddupicName: string) {
    return this.http.get(`/assets/${ddupicName}`);
  }

  // listDdupics() {
  //   return this.http.
  // }
}
