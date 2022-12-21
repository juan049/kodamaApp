import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppServicesRoutingModule } from './app-services-routing.module';
import { AppServicesComponent } from './pages/app-services/app-services.component';


@NgModule({
  declarations: [
    AppServicesComponent
  ],
  imports: [
    CommonModule,
    AppServicesRoutingModule
  ]
})
export class AppServicesModule { }
