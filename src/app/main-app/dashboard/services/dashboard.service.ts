import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _baseUrl: string = environment.backendApiURL;

  get user(): User{
    return {...this.authService.user};
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  saveNotes( notes: string): Observable<any> {
    const url = this._baseUrl + '/user/notes';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` || ''
    });

    const options = { headers: headers };

    const body = { notes };
    
    return this.http.patch<any>(url, body, options);

  }

}
