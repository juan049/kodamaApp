import { Component } from '@angular/core';
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
export class MainAppComponent {
  appName: string = environment.appName;
  todayDate = new Date();
  
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
}
