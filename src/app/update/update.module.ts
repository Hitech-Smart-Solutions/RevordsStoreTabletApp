import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateRoutingModule } from './update-routing.module';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './update.component';


@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    UpdateRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UpdateModule { }
