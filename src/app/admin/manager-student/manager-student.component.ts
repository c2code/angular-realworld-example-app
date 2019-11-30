import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Student, Classroom} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manager-student',
  templateUrl: './manager-student.component.html',
  styleUrls: ['../admin.component.css']
})
export class ManagerStudentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  classroom: Classroom;
  roomId: number;
  studentList: Student[];

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
      this.roomId = params['rid'];
    });

    this.populateClassroom(this.roomId).subscribe(_ => {;

    });

    //初始班级学员
    this.populateStudents(this.roomId).subscribe(_ => {;

    });

  }

  populateClassroom(rid) {
    return this.classroomService.getclassroom(rid*1)
      .map((classroom) => {
        this.classroom = classroom;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  populateStudents(rid) {
    return this.classroomService.getstudents(rid*1)
      .map((students) => {
        this.studentList = students;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onAdd():void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/add_student?rid=' + this.roomId);
  }

  onReturn(){
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/list_classroom?cid='+this.classroom.cid);
  }

  onManagerHomework(sid: number):void {
    //this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_student?rid='+cid);
  }

  onDelete(sid):void {
    var i: number;
    var student: Student;
    for (i=0; i < this.studentList.length; i++) {
      if (this.studentList[i].sid == sid ) {
        student = this.studentList[i]
        break;
      }
    }

    this.classroomService.deletestudent(student)
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    alert("success!")
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_student?rid='+ this.roomId);
  }

}
