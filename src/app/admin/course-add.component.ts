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
  selector: 'app-course-add',
  templateUrl: 'course-add.component.html',
  styleUrls: ['./admin.component.css']
})
export class CourseAddComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService
  ) { }

  courseList: Course[];
  currentUser: User;
  parentCouse: Course;
  currentPid: number;
  currentLevel:string;
  firstId:   number;
  secondId:  number;
  thirdId:   number;
  firstname: string = "";
  secondname: string = "";
  thirdname: string = "";
  newcid: number;


  mypath:string;

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
      this.currentPid    = params['pid'];
      this.currentLevel = params['level'];
      this.firstId   = params['fid'];
      this.secondId  = params['sid'];
      this.thirdId   = params['tid'];
    });

    //初始化章节课程
    this.newcid = 0;
    this.populateCourses().subscribe(_ => {;
      for (let tmp of this.courseList ) {
        if (tmp.pid == this.currentPid){
          this.newcid++
        }
        if (tmp.cid == this.currentPid) {
          this.parentCouse = tmp;
        }
        if ( tmp.cid == this.firstId ) {
          this.firstname = tmp.cname;
          continue;
        }
        if ( tmp.cid == this.secondId ) {
          this.secondname = tmp.cname;
          continue;
        }
        if ( tmp.cid == this.thirdId ) {
          this.thirdname = tmp.cname;
          continue;
        }
      }

      if (this.newcid > 8){
        this.newcid = this.newcid + 1 + this.currentPid*1000000
      } else {
        this.newcid = this.currentPid*10 + this.newcid + 1
      }

      if (this.currentPid == 0){
        this.mypath = "课程分类    " + this.currentLevel;
      }

      if (this.firstname != "") {
        this.mypath = this.currentLevel + " " + this.firstname;
      }

      if (this.secondname != "") {
        this.mypath = this.mypath + " / " + this.secondname;
      }

      if (this.thirdname != "") {
        this.mypath = this.mypath + " / " + this.thirdname;
      }

    });


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

  onReturn(){
    if (this.firstname == "") {
      this.router.navigateByUrl('/admin/'+this.currentUser.username+'/m_course');
    } else if(this.secondname == "") {
      this.router.navigateByUrl('/admin/' + this.currentUser.username + '/m_course2?cid=' + this.firstId);
    }else if(this.thirdname == "") {
      this.router.navigateByUrl('/admin/' + this.currentUser.username + '/m_course3?cid=' + this.secondId + "&pid=" + this.firstId);
    }else {
      this.router.navigateByUrl('/admin/' + this.currentUser.username + '/m_course4?cid=' + this.thirdId + "&pid=" + this.secondId + "&ppid=" + this.firstId);
    }
  }

  onAdd(cid: number, name:string, desc:string){

    this.mycoursesService.addcourse({"cid":cid, "cname":name, "cdes":desc.toString(), "clevel":this.currentLevel, "pid":this.currentPid*1, "cvedio":"","depth":0})
      .catch(error => Observable.throw(error)) 
      .subscribe( 
        data => console.log('success'), 
        error => console.log(error) 
      )

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    alert("success!")
    this.onReturn()
  }

}
