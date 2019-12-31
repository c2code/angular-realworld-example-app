import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core';
import {Course, HomeWork, Student} from "../core/models/mycourses.module";
import {MycoursesService} from "../core/services/mycourses.service";
import {User} from '../core/models/user.model'

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import {ClassroomService} from "../core/services/classroom.service";
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



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
  parentcourse: Course;
  student:    Student;
  clevel:     string;

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
      this.clevel     = params['level'];
    });

    //获取当前用户学生信息
    this.populateSudent(this.currentUser.uid, this.clevel).subscribe(_ => {;
    });

    this.url = `${environment.api_url}`+'/course/download?cid=';

    //获取章节课程
    this.populateCourses().subscribe(_ => {;
      for (let i = 0; i < this.courseList.length; i++) {
        if (this.courseList[i].pid === this.currentcid*1) {
          this.onSelect(this.courseList[i].cid);
          break
        }
      }
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

  populateSudent(uid, clevel) {
    return this.classroomService.getstudent(uid,clevel)
      .map((student) => {
        this.student = student;

      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onRights(course: Course): boolean {
    if (this.currentUser.role == "teacher" || this.currentUser.role == "admin" || this.currentUser.role == "super"){
      return true
    }
    var tmp = course.clevel.substr(1, course.clevel.length)
    var rights = 1 << (parseInt(tmp) - 1)

    if ((this.currentUser.rights & rights) == 0 ) {
      return false
    }

    if (course.cid > this.student.ccid) {
      return false
    }

    return  true
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
