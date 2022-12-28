import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

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
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.debouncer
      .pipe( debounceTime(3000) )
      .subscribe( () => {
        //TODO conectar con backend y almacenar
        console.log(this.notes);
      });
  }

  notesInput() {
    this.debouncer.next(this.notes);
  }

}
