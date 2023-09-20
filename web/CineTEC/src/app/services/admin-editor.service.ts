import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../models/movies.model';
@Injectable({
  providedIn: 'root',
})
export class AdminEditorService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + 'api/movie');
  }
}
