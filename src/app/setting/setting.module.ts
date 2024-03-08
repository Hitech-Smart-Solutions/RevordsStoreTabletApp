import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SettingPage } from './setting.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SettingPageRoutingModule } from './setting-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MembersVistLog } from '../api/service/model';
import { Tab7PageModule } from '../tab7/tab7.module';
import { HeaderPageModule } from '../header/header.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SettingPageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    Tab7PageModule,
    HeaderPageModule
  ],
  declarations: [SettingPage],
  providers: [
    MembersVistLog,
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingPageModule {}
