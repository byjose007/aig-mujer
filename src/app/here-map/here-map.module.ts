import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { HereMapPage } from './here-map.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'; 
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    component: HereMapPage
  }
];

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
     
    AgmCoreModule.forRoot({
      apiKey: environment.api_key
    }),
    AgmDirectionModule,
    
  ],
  declarations: [HereMapPage],
  providers: [Geolocation]
})
export class HereMapPageModule {}
