import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../models/movies.model';
import { Cinema } from '../models/cinema.model';
import { Projection } from '../models/projection.model';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root',
})
/* The AdminEditorService class is a TypeScript class that provides methods for managing movies, cinemas, projections, and rooms through HTTP requests. */
export class AdminEditorService {
  private url: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of movies.
   *
   * @return {Observable<Movie[]>} An observable that emits an array of Movie objects.
   */
  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url + 'api/movie');
  }

  /**
   * Deletes a movie.
   *
   * @param {Movie} movie - The movie to be deleted.
   * @return {Observable<Movie[]>} An observable that emits an array of movies after the deletion is successful.
   */
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

  /**
   * The addMovie function sends a POST request to the specified URL with the movie object as the payload and returns an Observable of an array of movies.
   * @param {Movie} movie - The parameter `movie` is of type `Movie`, which represents a single movie object.
   * @returns The addMovie function returns an Observable of type Movie[].
   */
  public addMovie(movie: Movie): Observable<Movie[]> {
    return this.http.post<Movie[]>(
      this.url + 'api/movie/add',
      movie,
      this.httpOptions
    );
  }

  /**
   * The getCinemas function returns an Observable that makes an HTTP GET request to retrieve a list of cinemas.
   * @returns The getCinemas() method returns an Observable of type Cinema[].
   */
  public getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.url + 'api/cinema');
  }

  /**
   * The function `deleteCinema` sends a DELETE request to the specified URL with the provided cinema object as the request body, and returns an Observable of an array of Cinema objects.
   * @param {Cinema} cinema - The `cinema` parameter is an object of type `Cinema` that represents the cinema to be deleted.
   * @returns an Observable of type Cinema[].
   */
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

  /**
   * The addCinema function sends a POST request to the server to add a new cinema and returns an Observable of an array of cinemas.
   * @param {Cinema} cinema - The parameter "cinema" is of type "Cinema", which means it is an object representing a cinema.
   * @returns The addCinema function is returning an Observable of type Cinema[].
   */
  public addCinema(cinema: Cinema): Observable<Cinema[]> {
    return this.http.post<Cinema[]>(
      this.url + 'api/cinema/add',
      cinema,
      this.httpOptions
    );
  }

  /**
   * The function `getProjections` returns an Observable that makes an HTTP GET request to retrieve an array of Projection objects.
   * @returns The getProjections() method returns an Observable of type Projection[].
   */
  public getProjections(): Observable<Projection[]> {
    return this.http.get<Projection[]>(this.url + 'api/projection');
  }

  /**
   * This function sends a DELETE request to the specified URL with the provided projection object as the request body, and returns an Observable of Projection[].
   * @param {Projection} projection - The `projection` parameter is an object of type `Projection` that represents the projection to be deleted.
   * @returns an Observable of type Projection[].
   */
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

  /**
   * The function `addProjection` sends a POST request to the specified URL with the provided projection data and returns an Observable of an array of projections.
   * @param {Projection} projection - The parameter `projection` is of type `Projection`, which is an object representing a projection.
   * @returns The addProjection method returns an Observable of type Projection[].
   */
  public addProjection(projection: Projection): Observable<Projection[]> {
    return this.http.post<Projection[]>(
      this.url + 'api/projection/add',
      projection,
      this.httpOptions
    );
  }

  /**
   * The function `getRooms` returns an Observable that makes an HTTP GET request to retrieve a list of rooms.
   * @returns The getRooms() method returns an Observable of type Room[].
   */
  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url + 'api/room');
  }

  /**
   * The `deleteRoom` function sends a DELETE request to the server to delete a room and returns an Observable of Room[].
   * @param {Room} room - The `room` parameter is an object of type `Room` that represents the room to be deleted.
   * @returns an Observable of type Room[].
   */
  public deleteRoom(room: Room): Observable<Room[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
      body: room,
    };

    return this.http.request<Room[]>(
      'DELETE',
      `${this.url}api/room/delete`,
      options
    );
  }

  /**
   * The addRoom function sends a POST request to the specified URL with the provided room object and returns an Observable of an array of rooms.
   * @param {Room} room - The `room` parameter is an object of type `Room` that represents the room to be added.
   * @returns The addRoom method returns an Observable of type Room[].
   */
  public addRoom(room: Room): Observable<Room[]> {
    return this.http.post<Room[]>(
      this.url + 'api/room/add',
      room,
      this.httpOptions
    );
  }
}
