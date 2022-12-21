import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./notes.css']
})
export class DashboardComponent  implements OnInit{

  debouncer: Subject<string> = new Subject();

  notes: string = 'Pon tus notas aquí';

  ngOnInit(): void {
    this.debouncer
      .pipe( debounceTime(3000) )
      .subscribe( () => {
        //TODO conectar con backend y almacenar
        console.log(this.notes);
      });
  }

  notesInput() {
    this.debouncer.next( this.notes);
  }

}
