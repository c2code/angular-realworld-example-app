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


@Component({
  selector: 'app-manager-course2',
  templateUrl: './manager-course2.component.html',
  styleUrls: ['../admin.component.css']
})
export class ManagerCourse2Component implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService) { }

  courseList: Course[];
  currentUser: User;
  selectCourse: Course;
  parentId: number;
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
    });

    //初始化章节课程
    this.populateCourses().subscribe(_ => {;
      //获取当前要修改课程全部信息
      for (let tmp of this.courseList ) {
        if ( tmp.cid == this.parentId ) {
          this.selectCourse = tmp;
          break;
        }
      }

    });

  }

  onSelect(course: Course): void {
    this.selectCourse = course;
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
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course3?cid='+ cid + "&pid=" + this.parentId+"&ppid=0");
  }

  onAdd():void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/add_course?pid=' + this.parentId + '&level=' + this.selectCourse.clevel + '&fid=' + this.parentId);
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
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course2?cid=' + this.parentId)
  }

}
