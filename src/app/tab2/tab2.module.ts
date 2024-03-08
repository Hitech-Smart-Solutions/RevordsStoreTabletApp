import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { HttpClient } from '@angular/common/http';
import { MemberData, User } from '../api/service/model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderPageModule } from '../header/header.module';
import { Tab7PageModule } from '../tab7/tab7.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    FontAwesomeModule, 
    Tab7PageModule,
    HeaderPageModule
  ],
  declarations: [Tab2Page],
  providers: [
    GetUserProfileService,
    HttpClient,
    User,
    MemberData
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2PageModule {}
