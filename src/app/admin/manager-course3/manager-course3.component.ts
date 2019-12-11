import { Component, OnInit } from '@angular/core';

import {MycoursesService} from "../../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {Course} from "../../core/models/mycourses.module";
import {User} from "../../core/models/user.model";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'

import { environment } from '../../../environments/environment';

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-manager-course3',
  templateUrl: './manager-course3.component.html',
  styleUrls: ['../admin.component.css']
})

export class ManagerCourse3Component implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService,
    private sanitizer:DomSanitizer) { }

  courseList: Course[];
  currentUser: User;
  parentCourse: Course;
  pparentCourse: Course;
  parentId: number = 0;
  pparentId: number = 0;
  url: SafeResourceUrl;
  media_url: string;
  selectedFile: File;
  childCount:number;

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
      this.parentId = params['cid'];
      this.pparentId = params['pid'];
    });

    //初始化章节课程
    this.populateCourses().subscribe(_ => {;
      //获取当前要修改课程全部信息
      for (let tmp of this.courseList ) {
        if ( tmp.cid == this.parentId ) {
          this.parentCourse = tmp;
          continue;
        }
        if ( tmp.cid == this.pparentId ) {
          this.pparentCourse = tmp;
          continue;
        }
      }

      //this.media_url = "../../../../courses_video/111/test.mp4";
      //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.media_url);
    });

    this.url = `${environment.api_url}`+'/course/download?cid=';
    //this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.media_url);
  }

  onSelect(course: Course): void {
    this.parentCourse = course;
  }

  populateCourses() {
    /*this.mycoursesService.getcourses()
      .subscribe(courses => this.courseList = courses);*/

    return this.mycoursesService.getcourses()
      .map((courses) => {
        this.courseList = courses;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });
  }

  //fid=first level id, sid = second level id ,tid = third level id, cid = itself id
  onModify(fid: number,sid:number,tid:number,cid:number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/modify_course?fid='+fid+'&sid='+sid+'&tid='+tid+'&cid='+cid);
  }

  onManager(cid: number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course4?cid='+cid + "&pid=" + this.parentId + "&ppid=" + this.pparentId);
  }

  onUpload(cid: number):void { 
    document.getElementById(cid.toString()).click(); 
  }  

  onFileChanged(event, course: Course) :void { 
    this.selectedFile = event.target.files[0]; 
    var formData: FormData = new FormData(); 
    formData.append('upload', this.selectedFile, this.selectedFile.name); 
    formData.append('cid', course.cid.toString());   
    //alert(cid.toString()) 

    this.mycoursesService.postuploadfile(formData)
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    alert("success!");
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course3?cid='+ this.parentId + "&pid=" + this.pparentId+"&ppid=0");

     }

  onAdd():void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/add_course?pid=' + this.parentId + '&level=' + this.pparentCourse.clevel + '&fid=' + this.pparentId + '&sid=' + this.parentId);
  }

  onDelete(cid):void {
    this.childCount = 0;
    var i: number;
    var course: Course;
    for (i=0; i < this.courseList.length; i++) {
      if (this.courseList[i].pid == cid ) {
        this.childCount++
      }
      if (this.courseList[i].cid == cid ) {
        course = this.courseList[i]
      }
    }

    if (this.childCount > 0){
      alert("失败：请先删除子课程！")
      return
    }

    this.mycoursesService.deletecourse(course)
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    alert("success!")
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course3?cid='+ this.parentId + "&pid=" + this.pparentId+"&ppid=0");
  }

}
