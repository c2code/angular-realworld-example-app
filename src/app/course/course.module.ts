import { NgModule } from '@angular/core';
import { CourseRoutingModule } from './course-routing.module';
import {CourseComponent} from './course.component'
import { SharedModule } from '../shared';
import { SecurePipe } from './secure.pipe';

@NgModule({
  imports: [
    SharedModule,
    CourseRoutingModule
  ],
  declarations: [
    CourseComponent,
    SecurePipe
  ]
})
export class CourseModule { }
