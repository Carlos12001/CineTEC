import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../models/movies.model';
import { Cinema } from '../models/cinema.model';
import { Projection } from '../models/projection.model';

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

  public getProjections(): Observable<Projection[]> {
    return this.http.get<Projection[]>(this.url + 'api/projection');
  }

  public deleteProjection(projection: Projection): Observable<Projection[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
      body: projection,
    };

    return this.http.request<Projection[]>(
      'DELETE',
      `${this.url}api/projection/delete`,
      options
    );
  }

  public addProjection(projection: Projection): Observable<Projection[]> {
    return this.http.post<Projection[]>(
      this.url + 'api/projection/add',
      projection,
      this.httpOptions
    );
  }
}
