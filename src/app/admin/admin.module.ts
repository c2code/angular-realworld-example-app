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
import { CourseManagerComponent } from './manager-course.component';

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
    CourseManagerComponent
  ]
})
export class AdminModule { }
