import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { MycoursesRoutingModule } from './mycourses-routing.module';
import {MycoursesResolver} from "./mycourses-resolver.service";
import {MycoursesComponent} from "./mycourses.component";

@NgModule({
  imports: [
    SharedModule,
    MycoursesRoutingModule
  ],
  declarations: [
    MycoursesComponent
  ],
  providers: [
    MycoursesResolver
  ]
})
export class MycoursesModule { }

