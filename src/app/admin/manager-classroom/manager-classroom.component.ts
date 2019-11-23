import { Component, OnInit } from '@angular/core';

import {MycoursesService} from "../../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {Course} from "../../core/models/mycourses.module";
import {User} from "../../core/models/user.model";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-manager-classroom',
  templateUrl: './manager-classroom.component.html',
  styleUrls: ['../admin.component.css']
})
export class ManagerClassroomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService
  ) { }

  courseList: Course[]
  currentUser: User;

  ngOnInit() {

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

    //初始化章节课程
    this.populateCourses().subscribe(_ => {;
    });


  }

  populateCourses() {
    return this.mycoursesService.getcourses()
      .map((courses) => {
        this.courseList = courses;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }


  onManager(cid: number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course2?cid='+cid);
  }

}
