import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  baseURL: string = environment.backendApiURL;
  constructor( private http: HttpClient ) { }
  accessToken: string = JSON.parse(localStorage.getItem('access_token')!) || '';

  getUsers() {
    const url = this.baseURL + '/users';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`,
    });
    const options = { headers: headers };

    this.http.get<any>(url, options)
      .subscribe( response => {
        console.log(response);
      });

  }

}
