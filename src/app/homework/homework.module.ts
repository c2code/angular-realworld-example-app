import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeworkRoutingModule } from './homework-routing.module';
import { SharedModule } from '../shared';
import {HomeworkComponent} from "./homework.component";

@NgModule({
  imports: [
    SharedModule,
    HomeworkRoutingModule
  ],
  declarations: [
    HomeworkComponent
  ]
})
export class HomeworkModule { }
