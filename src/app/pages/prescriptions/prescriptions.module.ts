import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrescriptionsPage } from './prescriptions.page';

const routes: Routes = [
  {
    path: '',
    component: PrescriptionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrescriptionsPage]
})
export class PrescriptionsPageModule {}
