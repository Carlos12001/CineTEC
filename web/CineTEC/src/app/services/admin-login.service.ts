import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Admin } from '../models/admin.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
/* The AdminLoginService class is responsible for handling the login functionality for admin users. */
export class AdminLoginService {
  /* The line `private url: string = environment.apiUrl;` is declaring a private variable `url` of type string and initializing it with the value of `environment.apiUrl`. */
  private url: string = environment.apiUrl;

  /* The `httpOptions` variable is an object that contains the headers for an HTTP request. In this case, it sets the `Content-Type` header to `application/json` and includes an `Authorization` header with the value `'my-auth-token'`. These headers provide information to the server about the type of data being sent (JSON) and can be used for authentication purposes. */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  /**
   * The constructor function initializes a private property http of type HttpClient.
   * @param {HttpClient} http - The `http` parameter is of type `HttpClient`. It is a dependency injection that allows you to make HTTP requests in your code.
   */
  constructor(private http: HttpClient) {}

  /**
   * The login function sends a POST request to the server with the provided email and password, and returns an Observable of type Admin.
   * @param {string} email - A string representing the email address of the admin user trying to log in.
   * @param {string} password - A string representing the password entered by the user during login.
   * @returns The login function is returning an Observable of type Admin.
   */
  public login(email: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(
      this.url + 'api/admin/login',
      { email, password },
      this.httpOptions
    );
  }
}
