import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User, MyUser} from "../../core/models/user.model";
import {Student, Classroom, Teacher} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modify-teacher',
  templateUrl: 'modify-teacher.component.html',
  styleUrls: ['../admin.component.css']
})
export class ModifyTeacherComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  teacherList: Teacher[];
  courseId: number;
  roomid:number;

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
      this.roomid = params['rid'];
    });

    //初始化教师列表
    this.populateTeachers().subscribe(_ => {;

    });

  }

  populateTeachers() {
    return this.classroomService.getteachers()
      .map((teachers) => {
        this.teacherList = teachers;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  populateQueryTeacherList(name) {
    return this.classroomService.getteacherbyname(name)
      .map((teachers) => {
        this.teacherList = teachers;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onReturn():void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/list_classroom?cid=' + this.courseId);
  }

  onModify(tid):void {
    var i: number;
    var teacher: Teacher;
    for (i=0; i < this.teacherList.length; i++) {
      if (this.teacherList[i].tid == tid ) {
        teacher = this.teacherList[i]
        break;
      }
    }

    this.classroomService.modifyteachers(teacher,this.roomid)
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    alert("success!")
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/list_classroom?cid=' + this.courseId);
  }

  onQuery(name){
    if (name == "" ){
      return
    }

    this.populateQueryTeacherList(name).subscribe(_ => {;
    });

  }

}
