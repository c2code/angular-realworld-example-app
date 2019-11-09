import { Component, OnInit } from '@angular/core';
import {MycoursesService} from "../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {Course} from "../core/models/mycourses.module";
import {User} from "../core/models/user.model";

@Component({
  selector: 'app-course-modify',
  templateUrl: 'course-modify.component.html',
  styleUrls: ['./admin.component.css']
})
export class CourseModifyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService
  ) { }

  courseList:    Course[];
  currentUser:   User;
  currentCourse: Course;
  firstId:   number;
  secondId:  number;
  thirdId:   number;
  currentId: number;
  firstname: string = "";
  secondname: string = "";
  thirdname: string = "";

  mypath: string = "";

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
      this.firstId   = params['fid'];
      this.secondId  = params['sid'];
      this.thirdId   = params['tid'];
      this.currentId = params['cid'];
    });

    //初始化章节课程
    this.populateCourses().subscribe(_ => {;
      //获取当前要修改课程全部信息
      for (let tmp of this.courseList ) {
        if (tmp.cid == this.currentId) {
          this.currentCourse = tmp;
          continue;
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

      if (this.firstname != "") {
        this.mypath = "/ L" +this.firstId + " " + this.firstname;
      }

      if (this.secondname != "") {
        this.mypath = this.mypath + " / " + this.secondname;
      }

      if (this.thirdname != "") {
        this.mypath = this.mypath + " / " + this.thirdname;
      }

      if (this.firstname != "")
      {
        this.mypath = this.mypath + " / " + this.currentCourse.cname;
      } else
      {
        this.mypath = "/ L" + this.currentCourse.cid + " " + this.currentCourse.cname;
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
      this.router.navigateByUrl('/admin/' + this.currentUser.username + '/m_course2?cid=' + this.currentCourse.pid);
    }else if(this.thirdname == "") {
      this.router.navigateByUrl('/admin/' + this.currentUser.username + '/m_course3?cid=' + this.currentCourse.pid + "&pid=" + this.firstId);
    }else {
      this.router.navigateByUrl('/admin/' + this.currentUser.username + '/m_course4?cid=' + this.currentCourse.pid + "&pid=" + this.secondId + "&ppid=" + this.firstId);
    }
  }

}
