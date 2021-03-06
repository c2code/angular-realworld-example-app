import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseComponent} from './course.component';
import {AuthGuard} from "../core/services/auth-guard.service";

const routes: Routes = [
  {
    path: ':username',
    component: CourseComponent,
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
