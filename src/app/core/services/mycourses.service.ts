import { Injectable } from '@angular/core';

import { HttpClient , HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';



//引用Course（课程）定义
import {Course} from "../../core/models/mycourses.module";


@Injectable()
export class MycoursesService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  getcourses(): Observable<Course[]> {
    return this.apiService.get('/course/')
      .pipe(map((data: {courses: Course[]}) => data.courses));
  }

  postuploadfile(formData): Observable<any> {
    const headersConfig = { 
      'Accept': 'upload/file' 
    };

    const req = new HttpRequest('POST', `${environment.api_url}`+'/course/upload', formData);
    const request = req.clone({ setHeaders: headersConfig });
    return this.http.request(request);
  }
}
