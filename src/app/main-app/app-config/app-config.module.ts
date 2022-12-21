import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppConfigRoutingModule } from './app-config-routing.module';
import { AppConfigComponent } from './pages/app-config/app-config.component';


@NgModule({
  declarations: [
    AppConfigComponent
  ],
  imports: [
    CommonModule,
    AppConfigRoutingModule
  ]
})
export class AppConfigModule { }
