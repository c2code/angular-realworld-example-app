import { Injectable } from '@angular/core';

import { HttpClient , HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';



//引用Course（课程）定义
import {Course, Classroom} from "../../core/models/mycourses.module";


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

}
