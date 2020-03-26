import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {User} from "../core/models/user.model";
import {Student, Classroom, HomeWork} from "../core/models/mycourses.module";
import { environment } from '../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  homeworklist: HomeWork[];
  url: SafeResourceUrl;
  homework: HomeWork = <HomeWork>{};

  ngOnInit() {

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

    //初始化作业
    this.populateHomeworks().subscribe(_ => {;

    });

    this.url = `${environment.api_url}`+'/homework/image?cid=';

  }

  populateHomeworks() {
    return this.classroomService.gethomeworkbyuid(this.currentUser.uid)
      .map((homeworks) => {
        this.homeworklist = homeworks;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onGo(cid, name){
    window.open(`${environment.scratch_url}`+'?ha='+this.currentUser.token+'&user='+ this.currentUser.uid + '&cid='+ cid + '&title=' + name)
  }

  onCommit(cid){
    this.homework.hstatus = '已提交'
    this.homework.cid = cid;
    this.homework.uid = this.currentUser.uid;

    this.classroomService.commithomework(this.homework)
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => alert("提交成功!"), 
        error => alert("提交失败!") 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    this.router.navigateByUrl('/homework/'+this.currentUser.username);
  }

}
