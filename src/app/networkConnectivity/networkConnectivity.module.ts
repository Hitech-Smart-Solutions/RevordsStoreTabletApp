import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NetworkConnectivityPageRoutingModule } from './networkConnectivity-routing.module';
import { GetUserProfileService } from '../api/service/get-user-profile.service';
import { HttpClient } from '@angular/common/http';
import { MemberData, User } from '../api/service/model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NetworkConnectivityPage } from './networkConnectivity.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NetworkConnectivityPageRoutingModule,
    FontAwesomeModule
  ],
  exports:[NetworkConnectivityPage],
  declarations: [NetworkConnectivityPage],
  providers: [
    GetUserProfileService,
    HttpClient,
    User,
    MemberData
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NetworkConnectivityPageModule {}
