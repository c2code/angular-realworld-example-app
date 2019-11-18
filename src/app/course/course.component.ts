import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core';
import { Course } from "../core/models/mycourses.module";
import {MycoursesService} from "../core/services/mycourses.service";
import {User} from '../core/models/user.model'

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-course-page',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private mycoursesService: MycoursesService,
    private sanitizer:DomSanitizer
  ) { }

  url: SafeResourceUrl;
  currentUser: User;
  currentcid: number;
  currentpid: number;
  courseList: Course[];
  childcourses: Course[];

  selectCourse: Course;
  media_url: string;

  ngOnInit() {

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

    //获取页面参数
    this.route.queryParams.subscribe(params=> {
      this.currentcid = params['id'];
      this.currentpid = params['pid'];
    });

    //获取章节课程
    this.populateCourses().subscribe(_ => {;
      this.onSelect(this.currentcid*10 + 1);
    });

  }

  onSelect(cid: number): void {

    this.childcourses = [];

    for (let i = 0; i < this.courseList.length; i++) {
      if (this.courseList[i].cid === cid){
        this.selectCourse = this.courseList[i];
      }
      if (this.courseList[i].pid === cid) {
        this.childcourses.push(this.courseList[i]);
      }
    }

    //this.media_url = "../../../courses_video/" + this.selectCourse.cid + "/test.mp4";
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.media_url);
    this.url = `${environment.api_url}`+'/course/download?cid=';
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
