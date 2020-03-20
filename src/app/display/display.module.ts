import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisplayComponent} from "./display.component";
import {SharedModule} from "../shared/shared.module";
import { DisplayRoutingModule } from './display-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DisplayRoutingModule
  ],
  declarations: [
    DisplayComponent
  ]
})
export class DisplayModule { }
