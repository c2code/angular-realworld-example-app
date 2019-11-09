import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "../core/services/auth-guard.service";
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {CourseModifyComponent} from "./course-modify.component";
import {CourseAddComponent} from "./course-add.component";
import {CourseUploadComponent} from "./course-upload.component";
import {UserRightsComponent} from "./user-rights.component";
import {HomeworkCommentComponent} from "./homework-comment.component";
import {ManagerCourseComponent} from "./manager-course.component";
import {ManagerCourse2Component} from "./manager-course2/manager-course2.component";
import {ManagerCourse3Component} from "./manager-course3/manager-course3.component";
import {ManagerCourse4Component} from "./manager-course4/manager-course4.component";
import {ManagerTeacherComponent} from "./manager-teacher.component"
import {ManagerStudentComponent} from "./manager-student.component"
import {ManagerHomeworkComponent} from "./manager-homework.component"

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
        path: 'upload',
        component: CourseUploadComponent
      },
      {
        path: 'm_teacher',
        component: ManagerTeacherComponent
      },
      {
        path: 'm_student',
        component: ManagerStudentComponent
      },
      {
        path: 'm_homework',
        component: ManagerHomeworkComponent
      },
      {
        path: 'rights',
        component: UserRightsComponent
      },
      {
        path: 'comment',
        component: HomeworkCommentComponent
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
