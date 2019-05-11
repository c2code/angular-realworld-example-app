import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

//引用Course（课程）定义
import {Course} from "../../core/models/mycourses.module";


@Injectable()
export class MycoursesService {

  constructor(
    private apiService: ApiService
  ) {}

  getcourses(): Observable<Course[]> {
    return this.apiService.get('/course/')
      .pipe(map((data: {courses: Course[]}) => data.courses));
  }
}
