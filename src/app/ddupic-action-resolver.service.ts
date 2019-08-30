import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {DdupicService} from './ddupic.service';

@Injectable({
  providedIn: 'root'
})

export class DdupicActionResolverService implements Resolve<any> {
  constructor(
    private ddupicService: DdupicService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.ddupicService.readDdupic(route.params.ddupicName).then(readDdupic => {
      return readDdupic;
    });
  }
}
