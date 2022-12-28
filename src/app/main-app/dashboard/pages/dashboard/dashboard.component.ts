import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./notes.css']
})
export class DashboardComponent  implements OnInit{

  debouncer: Subject<string> = new Subject();

  notes: string = this.user.notes || 'Pon tus notas aquí';

  get user(): User {
    return this.authService.user;
  }

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ){}

  ngOnInit(): void {
    this.debouncer
      .pipe( debounceTime(3000) )
      .subscribe( () => {
        //TODO conectar con backend y almacenar
        this.dashboardService.saveNotes(this.notes)
          .subscribe(resp => {
            if(resp.ok){
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Guardado correctamente'
              })
            }
          })
      });
  }

  notesInput() {
    this.debouncer.next(this.notes);
  }

}
