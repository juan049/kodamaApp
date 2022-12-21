import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styles: [
  ]
})
export class RecoveryComponent {
  loginForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.min(10)] ],
    passwordConfirmation: ['', [Validators.required, Validators.min(10)] ],
   });

  constructor ( private fb: FormBuilder) {}

}
