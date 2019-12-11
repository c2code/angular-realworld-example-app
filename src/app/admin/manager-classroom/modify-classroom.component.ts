import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {MycoursesService} from "../../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Course, Classroom} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


@Component({
  selector: 'app-modify-classroom',
  templateUrl: 'modify-classroom.component.html',
  styleUrls: ['../admin.component.css']
})
export class ModifyClassroomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService,
    private mycoursesService:MycoursesService
  ) { }

  currentUser: User;
  roomid: string;
  courseList: Course[];
  course: Course;
  classroom: Classroom;

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
      this.roomid = params['rid'];
    });

    this.populateClassroom(this.roomid).subscribe(_ => {;
    });

    //初始化章节课程
    this.populateCourses().subscribe(_ => {;
      //获取当前要修改课程全部信息
      for (let tmp of this.courseList ) {
        if ( tmp.cid == this.classroom.cid ) {
          this.course = tmp;
          break;
        }
      }
    });


  }

  populateClassroom(rid) {
    return this.classroomService.getclassroom(rid)
      .map((classroom) => {
        this.classroom = classroom;
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
    this.router.navigateByUrl('/admin/' + this.currentUser.username + '/list_classroom?cid=' + this.classroom.cid);
  }

  onModify(roomid: number, name:string, status:string, desc:string){

    this.classroomService.modifyclassroom({
      "roomid":roomid,
      "rname":name,
      "rdesc":desc,
      "stdnum":this.classroom.stdnum,
      "rstatus":status,
      "start":this.classroom.start,
      "end":this.classroom.end,
      "cid":this.classroom.cid,
      "tid":this.classroom.tid,
      "tname":this.classroom.tname
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
