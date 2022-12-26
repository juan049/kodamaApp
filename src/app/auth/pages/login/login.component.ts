import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private authService: AuthService
  ) {}

  validForm(): boolean {
    return this.loginForm?.valid;
  }

  login(): void {
     this.authService.login(
      this.loginForm.value['email'],
      this.loginForm.value['password']
    );
  }

}
