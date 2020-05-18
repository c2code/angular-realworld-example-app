import { Injectable } from '@angular/core';

import { HttpClient , HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';



//引用Course（课程）定义
import {Course, Classroom, Student, Teacher, HomeWork} from "../../core/models/mycourses.module";
import {User} from "../../core/models/user.model";


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

  getstudent(uid, clevel): Observable<Student> {
    return this.apiService.get('/student/?uid=' + uid + '&clevel=' + clevel)
      .pipe(map((data: {student: Student}) => data.student));
  }

  getstudents(rid): Observable<Student[]> {
    return this.apiService.get('/student/?rid=' + rid)
      .pipe(map((data: {students: Student[]}) => data.students));
  }

  getstudentsbypage(page): Observable<Student[]> {
    return this.apiService.get('/student/?page=' + page)
      .pipe(map((data: {students: Student[]}) => data.students));
  }

  getstudentscount(): Observable<number> {
    return this.apiService.get('/student/count')
      .pipe(map((data: {count: number}) => data.count));
  }

  addstudent(student): Observable<any> {
    return this.apiService.post('/student/add', student)
  }

  deletestudent(student): Observable<any> {
    return this.apiService.post('/student/delete', student)
  }

  getuserlist(name): Observable<User[]> {
    return this.apiService.get('/user/list?name=' + name)
      .pipe(map((data: {users: User[]}) => data.users));
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getlastteacher(): Observable<Teacher> {
    return this.apiService.get('/teacher/?tid=0')
      .pipe(map((data: {teacher: Teacher}) => data.teacher));
  }

   getteacherbyname(name): Observable<Teacher[]> {
    return this.apiService.get('/teacher/?name=' + name)
      .pipe(map((data: {teachers: Teacher[]}) => data.teachers));
  }

  getteachers(): Observable<Teacher[]> {
    return this.apiService.get('/teacher/')
      .pipe(map((data: {teachers: Teacher[]}) => data.teachers));
  }

  addteacher(teacher): Observable<any> {
    return this.apiService.post('/teacher/add', teacher)
  }

  deleteteacher(teacher): Observable<any> {
    return this.apiService.post('/teacher/delete', teacher)
  }

  modifyteachers(teacher, rid): Observable<any> {
    return this.apiService.post('/teacher/modify?rid=' + rid, teacher)
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getlasthomework(): Observable<HomeWork> {
    return this.apiService.get('/homework/')
      .pipe(map((data: {homework: HomeWork}) => data.homework));
  }

   gethomeworkbyuid(uid): Observable<HomeWork[]> {
    return this.apiService.get('/homework/?uid=' + uid)
      .pipe(map((data: {homeworks: HomeWork[]}) => data.homeworks));
  }

  gethomeworkbyuidcid(uid,cid): Observable<HomeWork> {
    return this.apiService.get('/homework/?uid=' + uid + '&cid=' +cid)
      .pipe(map((data: {homework: HomeWork}) => data.homework));
  }

  gethomeworkbyuidrid(uid,rid): Observable<HomeWork[]> {
    return this.apiService.get('/homework/?uid=' + uid + '&rid=' +rid)
      .pipe(map((data: {homeworks: HomeWork[]}) => data.homeworks));
  }

  addhomework(homework): Observable<any> {
    return this.apiService.post('/homework/add', homework)
  }

  modifyhomework(homework): Observable<any> {
    return this.apiService.post('/homework/modify', homework)
  }

  commithomework(homework): Observable<any> {
    return this.apiService.post('/homework/update', homework)
  }

}
