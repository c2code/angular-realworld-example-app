import { Injectable } from '@angular/core';

import { HttpClient , HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';



//引用Course（课程）定义
import {Course, Classroom, Student, Teacher} from "../../core/models/mycourses.module";
import {MyUser} from "../../core/models/user.model";


@Injectable()
export class ClassroomService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  getlastclassroom(): Observable<Classroom> {
    return this.apiService.get('/classroom/')
      .pipe(map((data: {classroom: Classroom}) => data.classroom));
  }

  getclassroom(rid): Observable<Classroom> {
    return this.apiService.get('/classroom/?rid=' + rid)
      .pipe(map((data: {classroom: Classroom}) => data.classroom));
  }

  getclassrooms(cid): Observable<Classroom[]> {
    return this.apiService.post('/classroom/', {"cid":cid})
      .pipe(map((data: {classrooms: Classroom[]}) => data.classrooms));
  }

  modifyclassroom(classroom: Classroom): Observable<any> {
    return this.apiService.post('/classroom/modify', classroom)
  }

  addclassroom(classroom): Observable<any> {
    return this.apiService.post('/classroom/add', classroom)
  }

  deleteclassroom(classroom: Classroom): Observable<any> {
    return this.apiService.post('/classroom/delete', classroom)
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getlaststudent(): Observable<Student> {
    return this.apiService.get('/student/')
      .pipe(map((data: {student: Student}) => data.student));
  }

  getstudents(rid): Observable<Student[]> {
    return this.apiService.get('/student/?rid=' + rid)
      .pipe(map((data: {students: Student[]}) => data.students));
  }

  addstudent(student): Observable<any> {
    return this.apiService.post('/student/add', student)
  }

  deletestudent(student): Observable<any> {
    return this.apiService.post('/student/delete', student)
  }

  getuserlist(name): Observable<MyUser[]> {
    return this.apiService.get('/user/list?name=' + name)
      .pipe(map((data: {users: MyUser[]}) => data.users));
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getlastteacher(): Observable<Teacher> {
    return this.apiService.get('/teacher/?tid=0')
      .pipe(map((data: {teacher: Teacher}) => data.teacher));
  }

  getteachers(): Observable<Teacher[]> {
    return this.apiService.get('/teacher/')
      .pipe(map((data: {teachers: Teacher[]}) => data.teachers));
  }

  addteachers(teacher): Observable<any> {
    return this.apiService.post('/teacher/add', teacher)
  }

  deleteteachers(teacher): Observable<any> {
    return this.apiService.post('/teacher/delete', teacher)
  }

  modifyteachers(teacher, rid): Observable<any> {
    return this.apiService.post('/teacher/modify?rid=' + rid, teacher)
  }

}
