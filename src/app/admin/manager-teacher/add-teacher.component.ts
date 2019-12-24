import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Student, Classroom, Teacher} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-add-teacher',
  templateUrl: 'add-teacher.component.html',
  styleUrls: ['../admin.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  userList: User[];
  lastteacher: Teacher;
  myusername: string;
  newtid:number;

  ngOnInit() {
    this.newtid = 1;
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

    this.populateLastTeacher().subscribe(_ => {;
    });

    if (this.myusername != ""){
      this.populateUserList(this.myusername).subscribe(_ => {;
      });
    }


  }

  populateLastTeacher() {
    return this.classroomService.getlastteacher()
      .map((teacher) => {
        this.lastteacher = teacher;
        this.newtid = this.lastteacher.tid + 1

      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  populateUserList(name) {
    return this.classroomService.getuserlist(name)
      .map((users) => {
        this.userList = users;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onQuery(name){
    this.myusername = name;
    this.populateUserList(this.myusername).subscribe(_ => {;
      });
  }

  onAddTeacher(uid){
    this.classroomService.addteacher({
      "tid":this.newtid*1,
      "tstatus":"",
      "uid":uid*1,
      "uname":"",
      "email":"",
      "phoe":"",
      "rcount":0
    })
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error)
      )

    this.onReturn()
  }

  onReturn(){
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_teacher')
  }

}
