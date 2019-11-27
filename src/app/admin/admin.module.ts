import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared';
import {AdminComponent} from "./admin.component";
import { CourseModifyComponent } from './course-modify.component';
import { CourseAddComponent } from './course-add.component';
import { ManagerCourseComponent } from './manager-course.component';
import { ManagerCourse2Component } from './manager-course2/manager-course2.component';
import { ManagerCourse3Component } from './manager-course3/manager-course3.component';
import { ManagerCourse4Component } from './manager-course4/manager-course4.component';
import { SecurePipe } from './secure.pipe';
import { ManagerClassroomComponent } from './manager-classroom/manager-classroom.component';
import { ClassroomListComponent } from './manager-classroom/classroom-list.component';
import { AddClassroomComponent } from './manager-classroom/add-classroom.component';
import { ModifyClassroomComponent } from './manager-classroom/modify-classroom.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    CourseModifyComponent,
    CourseAddComponent,
    ManagerCourseComponent,
    ManagerCourse2Component,
    ManagerCourse3Component,
    ManagerCourse4Component,
    SecurePipe,
    ManagerClassroomComponent,
    ClassroomListComponent,
    AddClassroomComponent,
    ModifyClassroomComponent
  ]
})
export class AdminModule { }
