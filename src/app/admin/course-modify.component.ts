import { Component, OnInit } from '@angular/core';
import {MycoursesService} from "../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {Course} from "../core/models/mycourses.module";
import {User} from "../core/models/user.model";

@Component({
  selector: 'app-course-modify',
  templateUrl: 'course-modify.component.html',
  styleUrls: ['./admin.component.css']
})
export class CourseModifyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService
  ) { }

  courseList:    Course[];
  currentUser:   User;
  currentCourse: Course;
  firstId:   number;
  secondId:  number;
  thirdId:   number;
  currentId: number;

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
      this.firstId   = params['fid'];
      this.secondId  = params['sid'];
      this.thirdId   = params['tid'];
      this.currentId = params['cid'];
    });

    //初始化章节课程
    this.populateCourses().subscribe(_ => {;
      //获取当前要修改课程全部信息
      for (let tmp of this.courseList ) {
        if ( tmp.cid == this.currentId ) {
          this.currentCourse = tmp;
          break;
        }
      }

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
