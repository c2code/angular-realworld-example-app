import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { environment } from '../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import {HomeWork} from "../core/models/mycourses.module";
import {User} from "../core/models/user.model";
import {UserService} from "../core/services/user.service";
import {ClassroomService} from "../core/services/classroom.service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classroomService:ClassroomService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  uid: string = "";
  cid: string = "";
  url: string = "";
  homework: HomeWork;
  currentUser: User;

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
      this.uid   = params['uid'];
      this.cid = params['cid'];
    });

    //初始化作业
    this.populateHomeworks(this.uid, this.cid).subscribe(_ => {;

    });

    this.url = `${environment.display_url}`+'/embed.html?uid='+this.uid+'&cid='+this.cid+'&auto-start=false&light-content=false&w=480&h=360';
  }

  safeurl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
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
    this.router.navigateByUrl('/homework/'+this.currentUser.username);
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

    this.router.navigateByUrl('/display/'+this.currentUser.username+'?uid='+this.currentUser.uid+'&cid='+cid);
  }

}
