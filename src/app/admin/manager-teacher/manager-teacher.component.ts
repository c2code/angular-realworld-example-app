import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Student, Classroom, Teacher} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manager-teacher',
  templateUrl: './manager-teacher.component.html',
  styleUrls: ['../admin.component.css']
})
export class ManagerTeacherComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  teacherList: Teacher[];

  ngOnInit() {

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

    //初始话教师列表
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

  onAdd():void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/add_teacher');
  }

  onDelete(tid):void {
    var i: number;
    var teacher: Teacher;
    for (i=0; i < this.teacherList.length; i++) {
      if (this.teacherList[i].tid == tid ) {
        teacher = this.teacherList[i]
        break;
      }
    }

    this.classroomService.deleteteacher(teacher)
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    alert("success!")
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_teacher');
  }

}
