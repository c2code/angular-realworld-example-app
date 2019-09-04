import { Component, OnInit } from '@angular/core';
import {User} from "../core/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../core/services/user.service";
import {MycoursesService} from "../core/services/mycourses.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private mycoursesService: MycoursesService
  ) { }

  currentUser: User;

  ngOnInit() {
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );
  }

}
