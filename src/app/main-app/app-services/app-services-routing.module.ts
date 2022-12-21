import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppServicesComponent } from './pages/app-services/app-services.component';

const routes: Routes = [
  { path: '', component: AppServicesComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppServicesRoutingModule { }
