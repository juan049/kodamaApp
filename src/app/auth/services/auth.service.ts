import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment'
import { AuthResponse, User } from '../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.backendApiURL;
  private _user!: User;

  get user(): User {
    return {...this._user};
  }

  constructor( 
    private http: HttpClient
  ) { }


  login( email: String, password: String) {
    const url = this._baseUrl + '/login';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    const body = { email, password };
    
    return this.http.post<AuthResponse>(url, body, { headers })
      .pipe(
        tap( resp => {
          if ( resp.ok ) {
            localStorage.setItem('token', resp.access_token! );
          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.message) )
      );
  }

  validateToken(): Observable<boolean> {
    const url = this._baseUrl + '/renew';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` || '' 
    }); 

    return this.http.get<AuthResponse>( url, { headers } )
        .pipe(
          map( resp => {
            localStorage.setItem('token', resp.access_token! );
            this._user = resp.data!;
            return resp.ok;
          }),
          catchError( err => of(false) )
        );
  }

  logout() {
    const url = this._baseUrl + '/logout';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` || '' 
    });
    this.http.get<AuthResponse>( url, { headers } );
    
    localStorage.clear();
  }

  recovery(email: string): Observable<boolean>{
    const url = this._baseUrl + '/recovery-password';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    
    const body = { email };

    return this.http.post<AuthResponse>( url, body, { headers } )
      .pipe(
        map( resp => {
          return resp.ok;
        }),
        catchError( err => of(false) )
      );
  }
}
