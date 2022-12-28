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

  loginForm: FormGroup = this.fb.group({
    email: ['email@email.com', [Validators.required, Validators.email] ],
    password: ['12345678', [Validators.required, Validators.min(10)] ]
   });

  constructor ( 
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService
  ) {}

  validForm(): boolean {
    return this.loginForm?.valid;
  }

  login() {
     this.authService.login( this.loginForm.value['email'], this.loginForm.value['password'] )
      .subscribe(ok => {
        if ( ok === true ) {
          this.router.navigateByUrl('/app');
        }else{
          console.log(ok);
          Swal.fire('Error', ok, 'error');
        }
      });
  }


}
