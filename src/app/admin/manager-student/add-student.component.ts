import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Student, Classroom} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-add-student',
  templateUrl: 'add-student.component.html',
  styleUrls: ['../admin.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  classroom: Classroom;
  roomId: number;
  userList: User[];
  laststudent: Student;
  myusername: string;
  newsid:number;

  ngOnInit() {
    this.newsid = 1;
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
      this.myusername = params['name'];
    });

    this.populateClassroom(this.roomId).subscribe(_ => {;
    });

    //this.populateLastSudent().subscribe(_ => {;
    //});

    if (this.myusername != ""){
      this.populateUserList(this.myusername).subscribe(_ => {;
      });
    }


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

  populateLastSudent() {
    return this.classroomService.getlaststudent()
      .map((student) => {
        this.laststudent = student;
        this.newsid = this.laststudent.sid + 1

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

  onAddStudent(uid){
    this.classroomService.addstudent({
      "sid":this.newsid*1,
      "uid":uid*1,
      "rid":this.roomId*1,
      "uname":"",
      "email":"",
      "phoe":"",
      "rname":"",
      "level":"",
      "ccid" :0
    })
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => alert("错误：该用户已经在其他班级！") 
      )

    this.onReturn()
  }

  onReturn(){
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_student?rid='+ this.roomId)
  }


}
