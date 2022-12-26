import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment'
import { Router } from '@angular/router';
import { LoginResponse } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = environment.backendApiURL;

  constructor( 
    private http: HttpClient,
    private router: Router,
  ) { }


  login( email: String, password: String) {
    const url = this.baseURL + '/login';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    const options = { headers: headers };

    const body = { email, password };
    this.http.post<LoginResponse>(url, body, options)
      .subscribe( response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('access_token', JSON.stringify(response.access_token));
        this.router.navigate(['/app']);
      });
  }

}
