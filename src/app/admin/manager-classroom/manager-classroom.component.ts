import { Component, OnInit } from '@angular/core';

import {MycoursesService} from "../../core/services/mycourses.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {Course, Classroom} from "../../core/models/mycourses.module";
import {User} from "../../core/models/user.model";
import {ClassroomService} from "../../core/services/classroom.service";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-manager-classroom',
  templateUrl: './manager-classroom.component.html',
  styleUrls: ['../admin.component.css']
})
export class ManagerClassroomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService,
    private mycoursesService:MycoursesService
  ) { }

  courseList: Course[]
  currentUser: User;
  classroomList: Classroom[]
  classroomNum:  number[] = []

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
      var i: number;
      for (i=0; i < this.courseList.length;i++) {
        this.classroomNum[this.courseList[i].cid * 1] = 0;
        if (this.courseList[i].pid == 0) {
          this.populateClassrooms(this.courseList[i].cid * 1).subscribe(_ => {;
          });
        }
      }
    });


  }

  populateCourses() {
    return this.mycoursesService.getcourses()
      .map((courses) => {
        this.courseList = courses;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  populateClassrooms(cid: number) {
    return this.classroomService.getclassrooms(cid*1)
      .map((classrooms) => {
        this.classroomList = classrooms;
        if(this.classroomList != null){
          this.classroomNum[cid] = this.classroomList.length;
        }
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }


  onManager(cid: number):void {
    this.router.navigateByUrl('/admin/'+this.currentUser.username+'/list_classroom?cid='+cid);
  }

}
