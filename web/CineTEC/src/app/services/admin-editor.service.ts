import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../models/movies.model';
import { Cinema } from '../models/cinema.model';

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

  public deleteMovie(movie: Movie): Observable<Movie[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
      body: movie,
    };

    return this.http.request<Movie[]>(
      'DELETE',
      `${this.url}api/movie/delete`,
      options
    );
  }

  public addMovie(movie: Movie): Observable<Movie[]> {
    return this.http.post<Movie[]>(
      this.url + 'api/movie/add',
      movie,
      this.httpOptions
    );
  }

  public getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.url + 'api/cinema');
  }

  public deleteCinema(cinema: Cinema): Observable<Cinema[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
      body: cinema,
    };

    return this.http.request<Cinema[]>(
      'DELETE',
      `${this.url}api/cinema/delete`,
      options
    );
  }

  public addCinema(cinema: Cinema): Observable<Cinema[]> {
    return this.http.post<Cinema[]>(
      this.url + 'api/cinema/add',
      cinema,
      this.httpOptions
    );
  }
}
