import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core';
import {Course, Student} from "../core/models/mycourses.module";
import {MycoursesService} from "../core/services/mycourses.service";
import {User} from '../core/models/user.model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ClassroomService} from "../core/services/classroom.service";

@Component({
  selector: 'app-mycourses-page',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})

export class MycoursesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private classroomService: ClassroomService,
    private mycoursesService: MycoursesService
  ) { }

  courseList: Course[] = [];
  selectcourse : Course;
  childcourses : Course[] = [];
  currentUser: User;
  student : Student;

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

    this.populateSudent(this.currentUser.uid, course.clevel).subscribe(_ => {;
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

    return true
  }

  onPlan(course: Course): boolean {
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
