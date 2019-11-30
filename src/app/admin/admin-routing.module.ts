import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "../core/services/auth-guard.service";
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {CourseModifyComponent} from "./course-modify.component";
import {CourseAddComponent} from "./course-add.component";
import {ManagerCourseComponent} from "./manager-course.component";
import {ManagerCourse2Component} from "./manager-course2/manager-course2.component";
import {ManagerCourse3Component} from "./manager-course3/manager-course3.component";
import {ManagerCourse4Component} from "./manager-course4/manager-course4.component";
import { ManagerClassroomComponent } from './manager-classroom/manager-classroom.component';
import {ClassroomListComponent} from './manager-classroom/classroom-list.component'
import {AddClassroomComponent} from './manager-classroom/add-classroom.component'
import {ModifyClassroomComponent} from "./manager-classroom/modify-classroom.component";
import {ManagerStudentComponent} from "./manager-student/manager-student.component"
import {AddStudentComponent} from "./manager-student/add-student.component"

const routes: Routes = [
  {
    path: ':username',
    component: AdminComponent,

    children: [
      {
        path: '',
        component: ManagerCourseComponent
      },
      {
        path: 'm_course',
        component: ManagerCourseComponent
      },
      {
        path: 'm_course2',
        component: ManagerCourse2Component
      },
      {
        path: 'm_course3',
        component: ManagerCourse3Component
      },
      {
        path: 'm_course4',
        component: ManagerCourse4Component
      },
      {
        path: 'modify_course',
        component: CourseModifyComponent
      },
      {
        path: 'add_course',
        component: CourseAddComponent
      },
      {
        path: 'm_classroom',
        component: ManagerClassroomComponent
      },
      {
        path: 'add_classroom',
        component: AddClassroomComponent
      },
      {
        path: 'list_classroom',
        component: ClassroomListComponent
      },
      {
        path: 'modify_classroom',
        component: ModifyClassroomComponent
      },
      {
        path: 'm_student',
        component: ManagerStudentComponent
      },
      {
        path: 'add_student',
        component: AddStudentComponent
      }
    ],

    canActivate: [AuthGuard]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
