import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab7Page } from './tab7.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab7PageRoutingModule } from './tab7-routing.module';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { HttpClient } from '@angular/common/http';
import { MemberData, User } from '../api/service/model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab7PageRoutingModule,
    FontAwesomeModule
  ],
  exports:[Tab7Page],
  declarations: [Tab7Page],
  providers: [
    GetUserProfileService,
    HttpClient,
    User,
    MemberData
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab7PageModule {}
