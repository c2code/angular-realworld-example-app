import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "../core/services/auth-guard.service";
import { RouterModule, Routes } from '@angular/router';
import {HomeworkComponent} from "./homework.component";


const routes: Routes = [
  {
    path: ':username',
    component: HomeworkComponent,
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeworkRoutingModule { }
