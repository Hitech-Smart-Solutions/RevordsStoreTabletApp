import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../api/service/model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Tab7PageModule } from '../tab7/tab7.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    Tab7PageModule
  ],
  declarations: [Tab1Page],
  providers: [
    GetUserProfileService,
    HttpClient,
    User
  ]
})
export class Tab1PageModule {}
