import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styles: [
  ]
})
export class RecoveryComponent {
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  recoverForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)] ],
  });

  get emailErrorMsg(): string {
    const errors = this.recoverForm.get('email')?.errors;
    if(errors?.['required']) {
     return 'El email es obligatorio';
    }else if(errors?.['pattern']){
     return 'El formato de email no es valido';
    }
    return '';
  }

  constructor ( 
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  noValidField(field: string){
    return this.recoverForm.get(field)?.invalid
      && this.recoverForm.get(field)?.touched;
  }

  recover() {
    // Marco como touched
    this.recoverForm.markAllAsTouched();
    if(this.recoverForm.valid){
      this.authService.recovery(this.recoverForm.get('email')?.value)
        .subscribe(ok => {
          if(ok){
            Swal.fire(
              'Email de recuperación enviado', 
              `Se envió un email de recuperación a la dirección ${this.recoverForm.get('email')?.value}`, 
              'success'
            );
            this.router.navigateByUrl('/login')
          }else{
            Swal.fire(
              'Error', 
              'No se pudo completar la acción', 
              'error'
            );
          }
        });
    }
  }
}
