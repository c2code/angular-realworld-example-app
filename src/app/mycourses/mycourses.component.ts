import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core';
import { Course } from "../core/models/mycourses.module";
import {MycoursesService} from "../core/services/mycourses.service";
import {User} from '../core/models/user.model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mycourses-page',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})

export class MycoursesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private mycoursesService: MycoursesService
  ) { }

  courseList: Course[] = [];
  selectcourse : Course;
  childcourses : Course[] = [];
  currentUser: User;

  ngOnInit() {

    //初始化基础课程数据
    this.populateCourses().subscribe(_ => {;
      this.onSelect(this.courseList[0]);
    });

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

  }

  onSelect(course: Course): void {
    this.selectcourse = course;

    this.childcourses = [];

    for (let i = 0; i < this.courseList.length; i++) {
      if (this.courseList[i].pid === this.selectcourse.cid) {
        this.childcourses.push(this.courseList[i]);
      }
    }
  }

  populateCourses() {
    /*this.mycoursesService.getcourses()
      .subscribe(courses => this.courseList = courses);*/

    return this.mycoursesService.getcourses()
      .map((courses) => {
        this.courseList = courses;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

}
