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
  selector: 'app-classroom-list',
  templateUrl: 'classroom-list.component.html',
  styleUrls: ['../admin.component.css']
})
export class ClassroomListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService,
    private mycoursesService:MycoursesService
  ) { }

  currentUser: User;
  classroomList: Classroom[]
  courseId: number;
  courseList: Course[];
  course: Course;

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

    //初始化班级
    this.populateClassrooms(this.courseId).subscribe(_ => {;
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

  }

  populateClassrooms(cid: number) {
    return this.classroomService.getclassrooms(cid*1)
      .map((classrooms) => {
        this.classroomList = classrooms;
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

  onAdd():void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/add_classroom?cid=' + this.courseId);
  }

  onManagerStudents(rid: number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_student?rid='+rid);
  }

  onAddTeacher(rid: number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/modify_teacher?rid='+rid + '&cid=' + this.courseId);
  }

  onReturn(){
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_classroom');
  }

  onModify(roomid: number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/modify_classroom?rid=' + roomid);
  }

  onDelete(rid):void {
    var i: number;
    var classroom: Classroom;
    for (i=0; i < this.classroomList.length; i++) {
      if (this.classroomList[i].roomid == rid ) {
        classroom = this.classroomList[i]
        break;
      }
    }

    if (classroom.stdnum > 0){
      alert("失败：请先移除全部学员!")
      return
    }

    this.classroomService.deleteclassroom(classroom)
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    alert("success!")
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/list_classroom?cid=' + classroom.cid)
  }

}
