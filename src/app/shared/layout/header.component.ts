import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserService } from '../../core';

import { environment } from '../../../environments/environment';
import {ClassroomService} from "../../core/services/classroom.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private classroomService: ClassroomService
  ) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  onGo(){
    //<a *ngIf="selectCourse.cid" target="_blank" href="http://localhost:8601?user={{currentUser.username}}&&cid={{selectCourse.cid}}&&title={{selectCourse.cname}}">
    this.classroomService.addhomework({
      "hid":0,
      "hstatus": "",
      "haddr":"",
      "uid":this.currentUser.uid*1,
      "cid":0,
      "hdesc":"自由创作",
      "comment":""
    })
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error)
      )

    window.open(`${environment.scratch_url}`+'?ha='+this.currentUser.token+'&user='+ this.currentUser.uid + '&cid=0&title=自由创作')

  }
}
