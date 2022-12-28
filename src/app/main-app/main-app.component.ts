import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/interfaces/auth.interface';
import { AuthService } from '../auth/services/auth.service';
import { environment } from './../../environments/environment';

interface sideNavMenuItem {
  icon: string;
  text: string;
  url: string;
}

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styles: [`
    li {
      cursor: pointer;
    }

    .hoverGray:hover {
      background-color: gray;
    }
  `]
})
export class MainAppComponent implements OnInit {
  
  //Nombre de la app
  appName: string = environment.appName;
  
  //Fecha actual
  todayDate = new Date();

  // Dark Mode
  theme: string = '';
  themeIcon: string = '';

  //Items del menú
  menuItems: sideNavMenuItem[] = [
    {
      icon: 'bi-house-door',
      text: 'Inicio',
      url: 'dashboard'
    },
    {
      icon: 'bi-people',
      text: 'Clientes',
      url: 'clients'
    },
    {
      icon: 'bi-person-lines-fill',
      text: 'Directorio',
      url: 'directory'
    },
    {
      icon: 'bi-wallet2',
      text: 'Servicios',
      url: 'app-services'
    },
    {
      icon: 'bi-tools',
      text: 'Herramientas',
      url: 'tools'
    },
    {
      icon: 'bi-file-earmark-text',
      text: 'Archivos',
      url: 'files'
    },
    {
      icon: 'bi-gear',
      text: 'Configuración',
      url: 'app-config'
    },
  ]

  //Datos del usuario
  get user(): User {
    return this.authService.user;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  //Inicializar el modo oscuro
  ngOnInit(): void {
      this.theme = localStorage.getItem('colorMode') || 'light'; 
      if( this.theme ===  'light'){
        this.themeIcon = 'bi-brightness-high-fill';
      }else{
        this.themeIcon = 'bi-moon-stars-fill';
      }
  }

  //Cambiar el tema de oscuro y claro
  changeTheme(): void {
    const htmlTag = document.documentElement;
   if (htmlTag.getAttribute('data-bs-theme') === 'light') {
    htmlTag.setAttribute('data-bs-theme', 'dark' );
    this.themeIcon = 'bi-moon-stars-fill';
   }else{
    htmlTag.setAttribute('data-bs-theme', 'light' );
    this.themeIcon = 'bi-brightness-high-fill';
   }
    
  }
  
  //Cerrae sesión
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
