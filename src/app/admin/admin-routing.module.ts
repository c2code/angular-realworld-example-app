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
import {CourseManagerComponent} from "./manager-course.component";

const routes: Routes = [
  {
    path: ':username',
    component: AdminComponent,

    children: [
      {
        path: '',
        component: CourseManagerComponent
      },
      {
        path: 'manager',
        component: CourseManagerComponent
      },
      {
        path: 'modify',
        component: CourseModifyComponent
      },
      {
        path: 'add',
        component: CourseAddComponent
      },
      {
        path: 'upload',
        component: CourseUploadComponent
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
