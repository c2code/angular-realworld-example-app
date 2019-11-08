import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared';
import {AdminComponent} from "./admin.component";
import { CourseModifyComponent } from './course-modify.component';
import { CourseAddComponent } from './course-add.component';
import { CourseUploadComponent } from './course-upload.component';
import { UserRightsComponent } from './user-rights.component';
import { HomeworkCommentComponent } from './homework-comment.component';
import { ManagerCourseComponent } from './manager-course.component';
import { ManagerTeacherComponent } from './manager-teacher.component';
import { ManagerStudentComponent } from './manager-student.component';
import { ManagerHomeworkComponent } from './manager-homework.component';
import { ManagerCourse2Component } from './manager-course2/manager-course2.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    CourseModifyComponent,
    CourseAddComponent,
    CourseUploadComponent,
    UserRightsComponent,
    HomeworkCommentComponent,
    ManagerCourseComponent,
    ManagerTeacherComponent,
    ManagerStudentComponent,
    ManagerHomeworkComponent,
    ManagerCourse2Component
  ]
})
export class AdminModule { }
