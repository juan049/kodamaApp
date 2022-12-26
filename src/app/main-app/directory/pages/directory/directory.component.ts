import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../../services/directory.service';

interface InternalMember {
  name: string;
  lastName: string;
  profileImg?: string;
  phone?: string;
  email?: string;
  profileUrl?: string;
}

interface Coordination {
  name: string;
  slug: string;
  members: InternalMember[];
}

interface Client {
  name: string;
  logoImage?: string;
  street?: string;
  suburb?: string;
  postalCode?: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  website?: string;
  rlName?: string;
  rlPhone?: string;
  rlEmail?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styles: [`
    .grow { transition: all .2s ease-in-out; }
    .grow:hover { transform: scale(1.1);  border: 3px solid green;}
  `]
})
export class DirectoryComponent implements OnInit {

  constructor( private directoryService: DirectoryService) {}
  ngOnInit(): void {
    this.directoryService.getUsers();
  }

  coordinations: Coordination[] = [
    {
      name: 'Coordinación de impacto y riesgo ambiental',
      slug: 'CIRA',
      members: this.internalMemberFill()
    },
    {
      name: 'Coordinación de licencias y autorizaciones',
      slug: 'CALP',
      members: this.internalMemberFill()
    }
  ];

  clients: Client[] = this.clientFill();

  


  internalMemberFill(): InternalMember[] {
    let members: InternalMember[] = [];

    for(let i = 1;i<13;i++){
      members.push({
        name: 'Nombre' + i,
        lastName: 'Apellido' + i,
        phone: '000-00-00-000',
        email: 'correo@correo.com',
      })
    }

    return members;
  }

  clientFill(): Client[] {
    let clients: Client[] = [];

    for(let i = 1;i<13;i++){
      clients.push({
        name: `Rason social ${i}`,
        city: 'Celaya',
        state: 'Guanajuato',
      })
    }
    return clients;
  }
  
}
