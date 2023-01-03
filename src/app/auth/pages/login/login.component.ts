import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)] ],
    password: ['', [Validators.required, Validators.minLength(10)] ]
   });

   get emailErrorMsg(): string {
     const errors = this.loginForm.get('email')?.errors;
     if(errors?.['required']) {
      return 'El email es obligatorio';
     }else if(errors?.['pattern']){
      return 'El formato de email no es valido';
     }
     return '';
   }

   get passwordErrorMsg(): string {
    const errors = this.loginForm.get('password')?.errors;
    if(errors?.['required']) {
     return 'El password es obligatorio';
    }else if(errors?.['minlength']){
     return 'El password requiere por lo menos de 10 caracteres';
    }
    return '';
  }




  constructor ( 
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService
  ) {}

  noValidField(field: string){
    return this.loginForm.get(field)?.invalid
      && this.loginForm.get(field)?.touched;
  }

  login() {
    // Marco como touched
    this.loginForm.markAllAsTouched();
    if( this.loginForm?.valid){ 
      this.authService.login( this.loginForm.value['email'], this.loginForm.value['password'] )
      .subscribe(ok => {
        if ( ok === true ) {
          this.router.navigateByUrl('/app');
        }else{
          Swal.fire(
            'Error', 
            `Error: ${ok}, Por favor contacta con soporte técnico`, 
            'error'
            );
          }
        });
      }
    }
}
