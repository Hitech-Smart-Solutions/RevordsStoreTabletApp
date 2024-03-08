import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GetUserProfileService } from './api/service/get-user-profile.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersVistLog, User } from './api/service/model'

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PromotionService } from './api/service/promotionService';
import { RewardService } from './api/service/rewardService';
import { AnnouncementService } from './api/service/announcementService';
import { ChecklistService } from './api/service/checklist';
import { Tab7PageModule } from './tab7/tab7.module';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { BackgroundService } from './api/service/backgroundService';
import { Market } from '@awesome-cordova-plugins/market/ngx';
import { AppService } from './api/service/app.service';
import { HeaderPageModule } from './header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    Tab7PageModule,
    HeaderPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GetUserProfileService,
    HttpClient,
    MembersVistLog,
    User,
    PromotionService,
    RewardService,
    AnnouncementService,
    ChecklistService,
    AppVersion,
    BackgroundMode,
    BackgroundService,
    Market,
    AppService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
