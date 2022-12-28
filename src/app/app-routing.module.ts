import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RecoveryComponent } from './auth/pages/recovery/recovery.component';
import { ValidateTokenGuard } from './guards/validate-token.guard';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'app',
        loadChildren: () => import('./main-app/main-app.module').then(m => m.MainAppModule),
        canActivate: [ValidateTokenGuard],
        canLoad: [ValidateTokenGuard], 
      },
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          {path: 'login', component: LoginComponent},
          {path: 'recovery', component: RecoveryComponent},
          {path: '**', redirectTo: 'login'}
        ]
      },
      {
        path: '**',
        redirectTo: 'app'
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
