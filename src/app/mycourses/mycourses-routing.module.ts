import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MycoursesComponent} from "./mycourses.component";
import {MycoursesResolver} from "./mycourses-resolver.service";
import {AuthGuard} from "../core/services/auth-guard.service";

const routes: Routes = [
  {
    path: ':username',
    component: MycoursesComponent,
    canActivate: [AuthGuard],
    resolve: {
      mycourses: MycoursesResolver
    }/*,
    children: [
      {
        path: 'course',
        component: CourseComponent
      }
    ]*/
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MycoursesRoutingModule { }
