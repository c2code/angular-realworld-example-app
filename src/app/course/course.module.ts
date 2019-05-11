import { NgModule } from '@angular/core';
import { CourseRoutingModule } from './course-routing.module';
import {CourseComponent} from './course.component'
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    CourseRoutingModule
  ],
  declarations: [
    CourseComponent
  ]
})
export class CourseModule { }
