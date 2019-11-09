import { Component, OnInit } from '@angular/core';

import {MycoursesService} from "../../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {Course} from "../../core/models/mycourses.module";
import {User} from "../../core/models/user.model";

@Component({
  selector: 'app-manager-course4',
  templateUrl: './manager-course4.component.html',
  styleUrls: ['../admin.component.css']
})
export class ManagerCourse4Component implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService) { }

  courseList: Course[];
  currentUser: User;
  parentCourse: Course;
  pparentCourse: Course;
  ppparentCourse: Course;
  parentId: number = 0;
  pparentId: number = 0;
  ppparentId: number = 0;

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
      this.ppparentId = params['ppid'];
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
        if ( tmp.cid == this.ppparentId ) {
          this.ppparentCourse = tmp;
          continue;
        }
      }

    });
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

}
