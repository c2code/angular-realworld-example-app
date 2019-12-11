import { Component, OnInit } from '@angular/core';
import {MycoursesService} from "../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {Course} from "../core/models/mycourses.module";
import {User} from "../core/models/user.model";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-course-manager',
  templateUrl: 'manager-course.component.html',
  styleUrls: ['./admin.component.css']
})
export class ManagerCourseComponent implements OnInit {

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService
  ) { }

  courseList: Course[]
  currentUser: User;
  selectCourse: Course;
  latestLevel: number;
  childCount: number;

  ngOnInit() {

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

    //初始化章节课程
    this.populateCourses().subscribe(_ => {;
      this.onSelect(this.courseList[0]);
      this.latestLevel = 0
      var i: number;
      for (i=0; i < this.courseList.length; i++) {
        if (this.courseList[i].pid == 0 ) {
          this.latestLevel++
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

  onModify(fid: number,sid:number,tid:number,cid:number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/modify_course?fid='+fid+'&sid='+sid+'&tid='+tid+'&cid='+cid);
  }

  //fid=first level id, sid = second level id ,tid = third level id, cid = itself id
  onAdd():void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/add_course?pid=0&level=L' + (this.latestLevel+1).toString());
  }

  onManager(cid: number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course2?cid='+cid);
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
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course')
  }


}
