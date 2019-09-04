import { Component, OnInit } from '@angular/core';
import {MycoursesService} from "../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {Course} from "../core/models/mycourses.module";
import {User} from "../core/models/user.model";

@Component({
  selector: 'app-course-manager',
  templateUrl: 'course-manager.component.html',
  styleUrls: ['./admin.component.css']
})
export class CourseManagerComponent implements OnInit {

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mycoursesService:MycoursesService
  ) { }

  courseList: Course[]
  currentUser: User;
  selectCourse: Course;

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
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/modify?fid='+fid+'&sid='+sid+'&tid='+tid+'&cid='+cid);
  }

  onAdd(fid: number,sid:number,tid:number,cid:number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/add?fid='+fid+'&sid='+sid+'&tid='+tid+'&cid='+cid);
  }

  onDelete(fid: number,sid:number,tid:number,cid:number):void {
  }

}
