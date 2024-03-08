import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'tab2/redeemRewards',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'tab2/memberProfile',
    loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then(m => m.Tab5PageModule)
  },
  {
    path: 'tab6',
    loadChildren: () => import('./tab6/tab6.module').then(m => m.Tab6PageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then(m => m.UpdateModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'networkConnectivity',
    loadChildren: () => import('./networkConnectivity/networkConnectivity.module').then(m => m.NetworkConnectivityPageModule)
  },
  // {
  //   path: 'tab7',
  //   loadChildren: () => import('./tab7/tab7.module').then(m => m.Tab7PageModule)
  // },
  // {
  //   path: 'header',
  //   loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FontAwesomeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
