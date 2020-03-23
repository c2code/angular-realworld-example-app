import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Student, Classroom, HomeWork} from "../../core/models/mycourses.module";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-modify-homework',
  templateUrl: 'modify-homework.component.html',
  styleUrls: ['../admin.component.css']
})
export class ModifyHomeworkComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService,
    private sanitizer: DomSanitizer) { }

  currentUser: User;
  courseId: number;
  roomId: number;
  studentuid : number;
  studentname: string;
  homework: HomeWork;
  url: string = "";

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
      this.studentuid = params['uid'];
      this.studentname = params['name'];
      this.roomId = params['rid'];
    });

    //初始化作业
    this.populateHomeworks(this.studentuid, this.courseId).subscribe(_ => {;

    });

    this.url = `${environment.display_url}`+'/embed.html?uid='+this.studentuid+'&cid='+this.courseId+'&auto-start=false&light-content=false&w=480&h=360';

  }

  populateHomeworks(uid,cid) {
    return this.classroomService.gethomeworkbyuidcid(uid, cid)
      .map((homework) => {
        this.homework = homework;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onReturn(){
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_homework?uid='+this.studentuid+'&rid='+this.roomId+'&name='+this.studentname);
  }

  onComment(comments):void {

    this.homework.comment = comments

    this.classroomService.modifyhomework(this.homework)
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_homework?uid='+this.studentuid+'&rid='+this.roomId+'&name='+this.studentname);
  }

  safeurl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
