import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../core';
import { Course } from "../core/models/mycourses.module";
import {MycoursesService} from "../core/services/mycourses.service";
import {User} from '../core/models/user.model'

@Component({
  selector: 'app-course-page',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private mycoursesService: MycoursesService
  ) { }

  currentUser: User;
  currentcid: number;
  currentpid: number;

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
      this.currentcid = params['id'];
      this.currentpid = params['pid'];
    });

  }

}
