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
import { ManagerStudentComponent } from './manager-student/manager-student.component';
import { AddStudentComponent } from './manager-student/add-student.component';
import { ManagerTeacherComponent } from './manager-teacher/manager-teacher.component';
import { AddTeacherComponent } from './manager-teacher/add-teacher.component';
import { ModifyTeacherComponent } from './manager-teacher/modify-teacher.component';
import { ManagerHomeworkComponent } from './manager-homework/manager-homework.component';
import { ModifyHomeworkComponent } from './manager-homework/modify-homework.component';

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
    ModifyClassroomComponent,
    ManagerStudentComponent,
    AddStudentComponent,
    ManagerTeacherComponent,
    AddTeacherComponent,
    ModifyTeacherComponent,
    ManagerHomeworkComponent,
    ModifyHomeworkComponent
  ]
})
export class AdminModule { }
