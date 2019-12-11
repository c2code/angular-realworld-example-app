import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Student, Classroom, HomeWork} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-manager-homework',
  templateUrl: './manager-homework.component.html',
  styleUrls: ['../admin.component.css']
})
export class ManagerHomeworkComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  classroom: Classroom;
  roomId: number;
  studentuid : number;
  studentname: string;
  homeworklist: HomeWork[];

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
      this.studentuid = params['uid'];
      this.studentname = params['name'];
    });

    this.populateClassroom(this.roomId).subscribe(_ => {;

    });

    //初始化作业
    this.populateHomeworks(this.studentuid, this.roomId).subscribe(_ => {;

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

  populateHomeworks(uid,rid) {
    return this.classroomService.gethomeworkbyuidrid(uid, rid)
      .map((homeworks) => {
        this.homeworklist = homeworks;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onReturn(){
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_student?rid='+ this.roomId);
  }

  onCommentHomework(uid, cid):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/modify_homework?uid='+uid+'&cid='+cid+'&name='+this.studentname+'&rid='+this.roomId);
  }

  onGo(uid, cid, name){
    window.open(`${environment.scratch_url}`+'?ha='+this.currentUser.token+'&user='+ uid + '&cid='+ cid + '&title=' + name)
  }

  onDelete(sid):void {
    /*var i: number;
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
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_student?rid='+ this.roomId);*/
  }

}
