import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core';
import {Course, HomeWork} from "../core/models/mycourses.module";
import {MycoursesService} from "../core/services/mycourses.service";
import {User} from '../core/models/user.model'

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import {ClassroomService} from "../core/services/classroom.service";
import { Observable } from 'rxjs';



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
    private classroomService: ClassroomService,
    private sanitizer:DomSanitizer
  ) { }

  url: SafeResourceUrl;
  currentUser: User;
  currentcid: number;
  currentpid: number;
  courseList: Course[];
  childcourses: Course[];
  parentcourse: Course

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
        for (let i = 0; i < this.courseList.length; i++) {
          if (this.courseList[i].cid === this.currentpid) {
            this.parentcourse = this.courseList[i];
            break
          }
        }
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onGo(){
    //<a *ngIf="selectCourse.cid" target="_blank" href="http://localhost:8601?user={{currentUser.username}}&&cid={{selectCourse.cid}}&&title={{selectCourse.cname}}">
    this.classroomService.addhomework({
      "hid":0,
      "hstatus": "",
      "haddr":"",
      "uid":this.currentUser.uid*1,
      "cid":this.selectCourse.cid*1,
      "hdesc":this.selectCourse.cname,
      "comment":""
    })
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => alert("该学员未缴费！")
      )

    window.open(`${environment.scratch_url}`+'?ha='+this.currentUser.token+'&user='+ this.currentUser.uid + '&cid='+ this.selectCourse.cid + '&title=' + this.selectCourse.cname)

  }

}
