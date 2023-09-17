import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin, admin } from '../models/admin.model';
import { Router } from '@angular/router';
// Descomenta para usar HttpClient
// import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  // Descomenta para usar HttpClient
  // constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmited() {
    if (this.loginForm.valid) {
      admin.email = this.loginForm.value.email;
      admin.password = this.loginForm.value.password;
      console.log(admin);

      // Simulación de envío al servidor
      this.fakeServerRequest(admin)
        .then((response) => {
          if (response === 'true') {
            console.log('Autenticación exitosa.');
          } else {
            console.log('Credenciales incorrectas.');
          }
        })
        .catch((error) => {
          console.log('Error del servidor:', error);
        });

      // Para enviar al servidor real, descomenta lo siguiente:
      /*
      this.http.post(`${apiUrl}/login`, adminData)
        .subscribe(
          (response: string) => { // Aquí especificamos que la respuesta es una cadena
            if (response === 'true') {
              console.log('Autenticación exitosa.');
            } else {
              console.log('Credenciales incorrectas.');
            }
          },
          error => {
            console.log('Error del servidor:', error);
          }
        );
      */
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
