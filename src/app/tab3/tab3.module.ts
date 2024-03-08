import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
// import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { ActivityHistory, User } from '../api/service/model';
import { Tab7PageModule } from '../tab7/tab7.module';
import { HeaderPageModule } from '../header/header.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    Tab7PageModule,
    HeaderPageModule
  ],
  providers: [
    ActivityHistory,
    User
  ],
  declarations: [Tab3Page],
  // providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Keyboard
  // ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab3PageModule {}
