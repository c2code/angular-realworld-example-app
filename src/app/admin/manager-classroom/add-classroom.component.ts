import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {MycoursesService} from "../../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Course, Classroom} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-classroom',
  templateUrl: 'add-classroom.component.html',
  styleUrls: ['../admin.component.css']
})
export class AddClassroomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService,
    private mycoursesService:MycoursesService
  ) { }

  currentUser: User;
  courseId: number;
  courseList: Course[];
  course: Course;
  lastclassroom: Classroom;
  newroomid: number;

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
      this.courseId = params['cid'];
    });

    //初始化章节课程
    this.populateCourses().subscribe(_ => {;
      //获取当前要修改课程全部信息
      for (let tmp of this.courseList ) {
        if ( tmp.cid == this.courseId ) {
          this.course = tmp;
          break;
        }
      }
    });

    this.populateLastClassroom().subscribe(_ => {;
      this.newroomid = this.lastclassroom.roomid + 1
    });


  }

  populateLastClassroom() {
    return this.classroomService.getlastclassroom()
      .map((classroom) => {
        this.lastclassroom = classroom;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
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

  onReturn(){
    this.router.navigateByUrl('/admin/' + this.currentUser.username + '/list_classroom?cid=' + this.courseId);
  }

  onAdd(roomid: number, name:string, status:string, desc:string){

    this.classroomService.addclassroom({
      "roomid":roomid,
      "rname":name,
      "rdesc":desc,
      "stdnum":0,
      "rstatus":status,
      "start":"",
      "end":"",
      "cid":this.courseId*1,
      "tid":0,
      "tname":""
    })
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    alert("success!")
    this.onReturn()
  }

}
