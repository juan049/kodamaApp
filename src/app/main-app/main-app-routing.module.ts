import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from './main-app.component';


const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m=>m.UserModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m=>m.ClientsModule)
      },
      {
        path: 'directory',
        loadChildren: () => import('./directory/directory.module').then(m=>m.DirectoryModule)
      },
      {
        path: 'app-services',
        loadChildren: () => import('./app-services/app-services.module').then(m=>m.AppServicesModule)
      },
      {
        path: 'tools',
        loadChildren: () => import('./tools/tools.module').then(m=>m.ToolsModule)
      },
      {
        path: 'files',
        loadChildren: () => import('./files/files.module').then(m=>m.FilesModule)
      },
      {
        path: 'app-config',
        loadChildren: () => import('./app-config/app-config.module').then(m=>m.AppConfigModule)
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
