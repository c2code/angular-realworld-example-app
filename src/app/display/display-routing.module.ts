import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "../core/services/auth-guard.service";
import { RouterModule, Routes } from '@angular/router';
import {DisplayComponent} from "./display.component";

const routes: Routes = [
  {
    path: ':username',
    component: DisplayComponent,
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DisplayRoutingModule { }
