import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {User} from "../core/models/user.model";
import {Student, Classroom, HomeWork} from "../core/models/mycourses.module";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  homeworklist: HomeWork[];

  ngOnInit() {

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

    //初始化作业
    this.populateHomeworks().subscribe(_ => {;

    });

  }

  populateHomeworks() {
    return this.classroomService.gethomeworkbyuid(this.currentUser.uid)
      .map((homeworks) => {
        this.homeworklist = homeworks;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  onGo(cid, name){
    window.open(`${environment.scratch_url}`+'?ha='+this.currentUser.token+'&user='+ this.currentUser.uid + '&cid='+ cid + '&title=' + name)
  }

}
