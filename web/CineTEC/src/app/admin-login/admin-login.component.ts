import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin, admin } from '../models/admin.model';
import { Router } from '@angular/router';
import { AdminLoginService } from '../services/admin-login.service';
import { Observable } from 'rxjs/internal/Observable';
import { AdminLoginResponse } from '../models/admin-login-response.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    protected adminLoginService: AdminLoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmited() {
    if (this.loginForm.valid) {
      admin.email = this.loginForm.value.email;
      admin.password = this.loginForm.value.password;

      this.adminLoginService.login(admin.email, admin.password).subscribe({
        next: (response: Admin) => {
          if (response) {
            admin.id = response.id;
            admin.name = response.name;
            admin.email = response.email;
            admin.password = response.password;
            this.router.navigate(['admin/editor']);
          } else {
            // Manejo de error. Por ejemplo, mostrar un mensaje de error al usuario.
          }
        },
        error: (err: any) => {
          if (err.status === 404) {
            console.log('No se encontró el recurso.');
          } else if (err.status === 400) {
            console.log('Petición incorrecta.');
          } else {
            console.log('Ocurrió un error desconocido.', err);
          }
        },
        complete: () => {
          // Código a ejecutar cuando el observable se completa, si es necesario.
        },
      });
    }
  }

  fakeServerRequest(adminData: Admin): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          adminData.email === 'pedro@gmail.com' &&
          adminData.password === '1234'
        ) {
          resolve('true');
        } else {
          resolve('false');
        }
      }, 2000);
    });
  }
}
