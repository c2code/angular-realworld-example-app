import { Component, OnInit } from '@angular/core';

import {ClassroomService} from "../../core/services/classroom.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";
import {Student, Classroom} from "../../core/models/mycourses.module";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Component({
  selector: 'app-list-student',
  templateUrl: 'list-student.component.html',
  styleUrls: ['../admin.component.css']
})
export class ListStudentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private classroomService:ClassroomService) { }

  currentUser: User;
  classroom: Classroom;
  roomId: number;
  userList: User[];
  laststudent: Student;
  myusername: string;
  newsid:number;

  pageNo = 1; //总页数
  preShow = false; //上一页
  nextShow = true; //下一页
  pageSize = 20; //单页显示数
  pageSizes = [10, 15, 20];
  curPage = 1; //当前页

  studentList: Student[];
  count : number = 0;

  ngOnInit() {
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        //this.canModify = (this.currentUser.username === this.article.author.username);
      }
    );

    //初始学员
    this.populateStudents(1).subscribe(_ => {;

    });

    //初始学员总数
    this.populateStudentsCount().subscribe(_ => {;
      this.pageNo = Math.ceil(this.count/20)
      if (this.pageNo == 0) {
        this.pageNo = 1
      }
      console.log(this.pageNo)
    });
  }

  populateStudents(page) {
    return this.classroomService.getstudentsbypage(page*1)
      .map((students) => {
        this.studentList = students;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  populateStudentsCount() {
    return this.classroomService.getstudentscount()
      .map((count) => {
        this.count = count;
      })
      .catch((error) => {
        console.log('error ' + error);
        throw error;
      });

  }

  getPageList() {
    if (this.pageNo >= 1) {
      if (this.pageNo < this.curPage) {
        this.curPage = this.curPage - 1;
      }
      if (this.pageNo === 1 || this.curPage === this.pageNo) {
        this.preShow = this.curPage !== 1;
        this.nextShow = false;
      } else {
        this.preShow = this.curPage !== 1;
        this.nextShow = true;
      }
    } else {
      this.pageNo = 1;
      this.curPage = 1;
    }
  }

  //点击上一页方法
  showPrePage() {
    this.curPage--;
    if (this.curPage >= 1) {
      this.getPageList();
    } else {
      this.curPage = 1;
    }

    this.populateStudents(this.curPage).subscribe(_ => {;

    });
  }

  //点击下一页方法
  showNextPage() {
    this.curPage++;
    if (this.curPage <= this.pageNo) {
      this.getPageList();
    } else {
      this.curPage = this.pageNo;
    }

    this.populateStudents(this.curPage).subscribe(_ => {;

    });
  }

  //自定义跳页方法
  onChangePage(value) {
    if (value > this.pageNo) {
      confirm('超出最大页数');
    } else if (value <= 0) {
      this.curPage = 1;
      this.getPageList();
    } else {
      this.curPage = value;
      this.getPageList();
    }

    this.populateStudents(this.curPage).subscribe(_ => {;

    });
  }

  //改变每页显示方法
  onChangePageSize(value) {
    this.pageSize = value;
    this.curPage = 1;
    this.getPageList();
  }

}
