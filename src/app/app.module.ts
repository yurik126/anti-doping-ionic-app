import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AuthService} from './services/auth.service';
import {VdmcApiService} from './services/vdmc-api.service';
import {NabizApiService} from './services/nabiz-api.service';
import {VdmcRequestService} from './services/vdmc-request.service';
import {DialogService} from './services/dialog.service';
import { MenuPageModule } from './pages/menu/menu.module';

import { TelifModalComponent } from './components/telif-modal/telif-modal.component';
import { SifreModalComponent } from './components/sifre-modal/sifre-modal.component';
import { TermsModalComponent } from './components/terms-modal/terms-modal.component';
import { PrescriptionDetailsComponent } from './components/prescription-details/prescription-details.component';
import { InteractionNutritionsModalComponent } from './components/interaction-nutritions-modal/interaction-nutritions-modal.component';
import { InteractionProductsModalComponent } from './components/interaction-products-modal/interaction-products-modal.component';
import { SportsModalComponent } from './components/sports-modal/sports-modal.component';

@NgModule({
  declarations: [AppComponent, TelifModalComponent, SifreModalComponent, TermsModalComponent,
    PrescriptionDetailsComponent, InteractionNutritionsModalComponent, InteractionProductsModalComponent, SportsModalComponent],
  entryComponents: [
    TelifModalComponent, SifreModalComponent, TermsModalComponent, PrescriptionDetailsComponent,
     InteractionNutritionsModalComponent, InteractionProductsModalComponent, SportsModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), HttpClientModule, CommonModule, FormsModule, MenuPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NabizApiService, AuthService, VdmcRequestService,VdmcApiService,DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
