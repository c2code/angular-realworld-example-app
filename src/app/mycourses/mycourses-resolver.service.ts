import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Profile, ProfilesService } from '../core';
import { catchError } from 'rxjs/operators';
import {MycoursesService} from "../core/services/mycourses.service";
import {Course} from "../core/models/mycourses.module";


@Injectable({
  providedIn: 'root'
})

export class MycoursesResolver implements Resolve<Course> {
  constructor(
    private mycoursesService: MycoursesService,
    private profilesService: ProfilesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    //return this.profilesService.get(route.params['username'])
    //  .pipe(catchError((err) => this.router.navigateByUrl('/')));

    return;// this.mycoursesService.getcourses()
    //  .pipe(catchError((err) => this.router.navigateByUrl('/')));

  }
}

