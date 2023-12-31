import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEditorService } from '../services/admin-editor.service';

import { Admin, admin } from '../models/admin.model';
import { Movie } from '../models/movies.model';
import { Cinema } from '../models/cinema.model';
import { Projection } from '../models/projection.model';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css'],
})

/** The AdminEditorComponent class represents the component that manages the editing of movies, cinemas, projections, and rooms. */
export class AdminEditorComponent implements OnInit {
  /* The above code is declaring a variable named "dataAdmin" of type "Admin" or "undefined" in TypeScript. */
  dataAdmin: Admin | undefined;

  /* The above code is declaring a variable named "selectedEntity" of type string and initializing it with an empty string. */
  selectedEntity: string = '';

  /* The above code is declaring an array called "entities" which contains objects with two properties: "label" and "value". Each object represents an entity and its corresponding value. The entities included in the array are "Películas" (Movies), "Sucursales" (Cinemas), "Proyecciones" (Projections), and "Salas" (Rooms). */
  entities = [
    { label: 'Películas', value: 'movies' },
    { label: 'Sucursales', value: 'cinemas' },
    { label: 'Proyecciones', value: 'projections' },
    { label: 'Salas', value: 'rooms' },
  ];

  /* The above code is declaring a variable named "movies" and assigning it an empty array of type "Movie". */
  movies: Movie[] = [];

  /* The above code is declaring a variable named "selectedMovie" of type "Movie" or "null". */
  selectedMovie: Movie | null = null;

  /* The above code is declaring a class in TypeScript with a property named "originalMovie" that can hold a value of type "Movie" or null. The initial value of "originalMovie" is set to null. */
  originalMovie: Movie | null = null;

  /* The above code is declaring a variable called "cinemas" and assigning it an empty array of type "Cinema". */
  cinemas: Cinema[] = [];

  /* The above code is declaring a variable named `selectedCinema` of type `Cinema` or `null` in TypeScript. */
  selectedCinema: Cinema | null = null;

  /* The above code is declaring a class in TypeScript called "Cinema" and initializing a variable called "originalCinema" with a value of null. The variable is of type "Cinema" or null, indicating that it can either hold an instance of the "Cinema" class or be null. */
  originalCinema: Cinema | null = null;

  /* The above code is declaring a class property called "projections" which is an array of objects of type "Projection". */
  projections: Projection[] = [];

  /* The above code is declaring a variable named "selectedProjection" of type "Projection" or null. It is initially set to null. */
  selectedProjection: Projection | null = null;

  /* The above code is declaring a class property named "originalProjection" of type "Projection" or null. */
  originalProjection: Projection | null = null;

  /* The above code is declaring a variable called "rooms" and assigning it an empty array of type "Room". */
  rooms: Room[] = [];

  /* The above code is declaring a variable named `selectedRoom` of type `Room` or `null`. */
  selectedRoom: Room | null = null;

  /* The above code is declaring a class in TypeScript called "Room" with a property called "originalRoom" that can hold either a value of type "Room" or null. The initial value of "originalRoom" is set to null. */
  originalRoom: Room | null = null;

  /**
   * The constructor function initializes private properties for the router and adminEditorService.
   * @param {Router} router - The `router` parameter is an instance of the `Router` class, which is used for navigating between different routes in an Angular application. It allows you to programmatically navigate to different views or components.
   * @param {AdminEditorService} adminEditorService - The `adminEditorService` parameter is an instance of the `AdminEditorService` class. It is used to interact with the backend and perform administrative tasks related to editing content.
   */
  constructor(
    private router: Router,
    private adminEditorService: AdminEditorService
  ) {}

  /**
   * Initializes the component and assigns the 'admin' data to 'dataAdmin'
   *  property.
   * If 'name' property of 'dataAdmin' is undefined, it navigates to the
   *  'admin/login' route.
   *
   * @return {void} This function does not return anything.
   */
  ngOnInit(): void {
    this.dataAdmin = admin;
    if (this.dataAdmin.name === undefined) {
      this.router.navigate(['admin/login']);
    }
  }

  /**
   * Creates a deep copy of an object.
   *
   * @param {any} obj - The object to be copied.
   * @return {any} The deep copy of the object.
   */
  deepCopy(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    // Especifica el tipo aquí
    const copy: Record<string, any> = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = this.deepCopy(obj[key]);
      }
    }
    return copy;
  }

  /**
   * Clear all data in the class variables.
   */
  clearData() {
    this.movies = [];
    this.selectedMovie = null;
    this.originalMovie = null;
    this.cinemas = [];
    this.selectedCinema = null;
    this.originalCinema = null;
    this.projections = [];
    this.selectedProjection = null;
    this.originalProjection = null;
    this.rooms = [];
    this.selectedRoom = null;
    this.originalRoom = null;
  }

  /**
   * A function that tracks the index of an item.
   *
   * @param {number} index - The index of the item.
   * @param {any} item - The item being tracked.
   * @return {number} The index of the item.
   */
  trackByFunction(index: number, item: any): number {
    return index;
  }

  /**
   * Sets the selected entity.
   *
   * @param {string} entity - The entity to set as selected.
   */
  setSelectedEntity(entity: string) {
    this.clearData();
    this.selectedEntity = entity;
    if (entity === 'movies') {
      this.loadMovies();
    }
    if (entity === 'cinemas') {
      this.loadCinemas();
    }
    if (entity === 'projections') {
      this.loadProjections();
    }
    if (entity == 'rooms') {
      this.loadRooms();
    }
  }

  //
  //
  // Movies
  //
  //

  /**
   * Loads the movies by making a request to the server and updating the `movies` class variable with the received data.
   *
   * @return {void}
   */
  loadMovies() {
    this.adminEditorService.getMovies().subscribe({
      next: (data: Movie[]) => {
        this.movies = data; // Actualiza la variable de clase movies con los datos recibidos
        console.log('Películas cargadas exitosamente.');
      },
      error: (err: any) => {
        console.error('Error al cargar las películas:', err);
        if (err.status === 404) {
          console.log('No se encontraron películas.');
        } else {
          console.log('Ocurrió un error desconocido.', err);
        }
      },
      complete: () => {
        // Código a ejecutar cuando el observable se completa, si es necesario.
        console.log('La carga de películas se ha completado.');
      },
    });
  }

  /**
   * Selects a movie.
   *
   * @param {Movie} movie - The movie to be selected.
   */
  selectMovie(movie: Movie) {
    this.selectedMovie = this.deepCopy(movie);
    this.originalMovie = movie;
  }

  /**
   * Submitthe movie.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  submitMovie() {
    if (this.selectedMovie) {
      if (this.selectedMovie.oname === '--New Movie--') {
        const newName = window.prompt(
          'Introduce el nuevo nombre de la película'
        );

        if (newName === null || newName.trim() === '') {
          console.log('Envío cancelado');
          return;
        }

        const doesExist = this.movies.some((movie) => movie.oname === newName);

        if (doesExist) {
          window.alert(
            'Ya existe una película con el mismo nombre. Por favor, elige otro nombre.'
          );
          return;
        } else {
          this.selectedMovie.oname = newName;
        }
      }
      if (
        JSON.stringify(this.originalMovie) ===
        JSON.stringify(this.selectedMovie)
      ) {
        console.log('Ningún cambio detectado, envío cancelado.');
        return;
      }

      if (this.selectedMovie != null) {
        this.deleteMovie();
      }

      this.adminEditorService.addMovie(this.selectedMovie).subscribe({
        next: (data: Movie[]) => {
          console.log('Película agregada o actualizada exitosamente.');
          this.movies = data;
        },
        error: (err: any) => {
          console.error('Error al agregar o actualizar la película:', err);
          // Aquí puedes agregar más manejo de errores
        },
        complete: () => {
          console.log('La operación de agregar o actualizar se ha completado.');
        },
      });
    }
  }

  /**
   * Adds a new item to the "prota" array of the selected movie, if the
   * selected movie and "prota" array exist.
   * @return {void} This function does not return anything.
   */
  addProta() {
    if (this.selectedMovie && this.selectedMovie.prota) {
      this.selectedMovie.prota.push('');
    }
  }

  /**
   * Removes an element from the `prota` array of the `selectedMovie`
   * object at the specified index.
   *
   * @param {number} index - The index of the element to be removed.
   * @return {void} This function does not return anything.
   */
  removeProta(index: number) {
    if (this.selectedMovie && this.selectedMovie.prota) {
      this.selectedMovie.prota.splice(index, 1);
    }
  }

  /**
   * Retrieves the safe prota at the specified index.
   *
   * @param {number} i - The index of the prota to retrieve.
   * @return {string} The safe prota at the specified index, or an
   * empty string if it does not exist.
   */
  getSafeProta(i: number): string {
    if (
      this.selectedMovie &&
      this.selectedMovie.prota &&
      this.selectedMovie.prota.length > i
    ) {
      return this.selectedMovie.prota[i];
    }
    return '';
  }

  /**
   * Sets the value of a specific element in the 'prota' array of the
   * selected movie.
   *
   * @param {number} i - The index of the element to set.
   * @param {string} value - The value to set.
   * @return {void} This function does not return any value.
   */
  setSafeProta(i: number, value: string): void {
    if (
      this.selectedMovie &&
      this.selectedMovie.prota &&
      this.selectedMovie.prota.length > i
    ) {
      this.selectedMovie.prota[i] = value;
    }
  }

  /**
   * Deletes the selected movie.
   *
   * @return {void} This function does not return anything.
   */
  deleteMovie() {
    if (this.selectedMovie) {
      this.adminEditorService.deleteMovie(this.selectedMovie).subscribe({
        next: (data: Movie[]) => {
          console.log('Película borrada exitosamente:', this.selectedMovie);
          this.clearData();
          this.movies = data;
        },
        error: (err: any) => {
          console.error('Error al borrar la película:', err);
          if (err.status === 404) {
            console.log('La película no se encontró.');
          } else {
            console.log('Ocurrió un error desconocido.', err);
          }
        },
        complete: () => {
          console.log('La operación de borrado se ha completado.');
        },
      });
    }
  }

  /**
   * Adds a new movie to the list.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  addNewMovie() {
    this.originalMovie = null;
    this.loadMovies();
    this.selectedMovie = {
      oname: '--New Movie--',
      cname: '',
      rating: '',
      director: '',
      duration: '',
      image: '',
      prota: [],
    };
  }

  //
  //
  // CINEMAS
  //
  //

  /**
   * Loads the cinemas by making a request to the server.
   *
   * @return {void} This function does not return anything.
   */
  loadCinemas() {
    this.adminEditorService.getCinemas().subscribe({
      next: (data: Cinema[]) => {
        this.cinemas = data; // Actualiza la variable de clase cinemas con los datos recibidos
        console.log('Sucursales cargadas exitosamente.');
      },
      error: (err: any) => {
        console.error('Error al cargar las sucursales:', err);
        if (err.status === 404) {
          console.log('No se encontraron sucursales.');
        } else {
          console.log('Ocurrió un error desconocido.', err);
        }
      },
      complete: () => {
        // Código a ejecutar cuando el observable se completa, si es necesario.
        console.log('La carga de sucursales se ha completado.');
      },
    });
  }

  /**
   * Selects a cinema.
   *
   * @param {Cinema} cinema - The cinema to be selected.
   */
  selectCinema(cinema: Cinema) {
    this.selectedCinema = this.deepCopy(cinema);
    this.originalCinema = cinema;
  }

  /**
   * Submitthe cinema.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  submitCinema() {
    if (this.selectedCinema) {
      if (this.selectedCinema.name === '--New Cinema--') {
        const newName = window.prompt(
          'Introduce el nuevo nombre de la surcursal'
        );

        if (newName === null || newName.trim() === '') {
          console.log('Envío cancelado');
          return;
        }

        const doesExist = this.cinemas.some(
          (cinema) => cinema.name === newName
        );

        if (doesExist) {
          window.alert(
            'Ya existe una surcursal con el mismo nombre. Por favor, elige otro nombre.'
          );
          return;
        } else {
          this.selectedCinema.name = newName;
        }
      }
      if (
        JSON.stringify(this.originalCinema) ===
        JSON.stringify(this.selectedCinema)
      ) {
        console.log('Ningún cambio detectado, envío cancelado.');
        return;
      }

      if (this.selectedCinema != null) {
        this.deleteCinema();
      }

      this.adminEditorService.addCinema(this.selectedCinema).subscribe({
        next: (data: Cinema[]) => {
          console.log('surcursal agregada o actualizada exitosamente.');
          this.cinemas = data;
        },
        error: (err: any) => {
          console.error('Error al agregar o actualizar la surcursal:', err);
          // Aquí puedes agregar más manejo de errores
        },
        complete: () => {
          console.log('La operación de agregar o actualizar se ha completado.');
        },
      });
    }
  }

  /**
   * Adds a new item to the "roomid" array of the selected cinema, if the
   * selected cinema and "roomid" array exist.
   * @return {void} This function does not return anything.
   */
  addRoomid() {
    if (this.selectedCinema && this.selectedCinema.roomid) {
      this.selectedCinema.roomid.push('');
    }
  }

  /**
   * Removes an element from the `roomid` array of the `selectedCinema`
   * object at the specified index.
   *
   * @param {number} index - The index of the element to be removed.
   * @return {void} This function does not return anything.
   */
  removeRoomid(index: number) {
    if (this.selectedCinema && this.selectedCinema.roomid) {
      this.selectedCinema.roomid.splice(index, 1);
    }
  }

  /**
   * Retrieves the safe roomid at the specified index.
   *
   * @param {number} i - The index of the roomid to retrieve.
   * @return {string} The safe roomid at the specified index, or an
   * empty string if it does not exist.
   */
  getSafeRoomid(i: number): string {
    if (
      this.selectedCinema &&
      this.selectedCinema.roomid &&
      this.selectedCinema.roomid.length > i
    ) {
      return this.selectedCinema.roomid[i];
    }
    return '';
  }

  /**
   * Sets the value of a specific element in the 'roomid' array of the
   * selected cinema.
   *
   * @param {number} i - The index of the element to set.
   * @param {string} value - The value to set.
   * @return {void} This function does not return any value.
   */
  setSafeRoomid(i: number, value: string): void {
    if (
      this.selectedCinema &&
      this.selectedCinema.roomid &&
      this.selectedCinema.roomid.length > i
    ) {
      this.selectedCinema.roomid[i] = value;
    }
  }

  /**
   * Deletes the selected cinema if there is one.
   *
   * @return {void}
   */
  deleteCinema() {
    if (this.selectedCinema) {
      this.adminEditorService.deleteCinema(this.selectedCinema).subscribe({
        next: (data: Cinema[]) => {
          console.log('surcursal borrada exitosamente:', this.selectedCinema);
          this.clearData();
          this.cinemas = data;
        },
        error: (err: any) => {
          console.error('Error al borrar la surcursal:', err);
          if (err.status === 404) {
            console.log('La surcursal no se encontró.');
          } else {
            console.log('Ocurrió un error desconocido.', err);
          }
        },
        complete: () => {
          console.log('La operación de borrado se ha completado.');
        },
      });
    }
  }

  /**
   * Initializes a new cinema by resetting the original cinema, loading the cinemas, and setting the selected cinema to a new cinema object.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  addNewCinema() {
    this.originalCinema = null;
    this.loadCinemas();
    this.selectedCinema = {
      name: '--New Cinema--',
      province: '',
      country: '',
      roomsamount: 0,
      roomid: [],
    };
  }

  //
  //
  // PROJECTIONS
  //
  //

  /**
   * Loads the projections by making a GET request to the adminEditorService.
   * Updates the class variable projections with the received data.
   * Logs a success message if the projections are loaded successfully.
   * Logs an error message if there is an error while loading the projections.
   * Logs a message if no projections are found.
   * Logs a message if an unknown error occurs.
   * Executes the code when the observable completes, if necessary.
   */
  loadProjections() {
    this.adminEditorService.getProjections().subscribe({
      next: (data: Projection[]) => {
        this.projections = data; // Actualiza la variable de clase projections con los datos recibidos
        console.log('Proyecciones cargadas exitosamente.');
      },
      error: (err: any) => {
        console.error('Error al cargar las proyecciones:', err);
        if (err.status === 404) {
          console.log('No se encontraron proyecciones.');
        } else {
          console.log('Ocurrió un error desconocido.', err);
        }
      },
      complete: () => {
        // Código a ejecutar cuando el observable se completa, si es necesario.
        console.log('La carga de proyecciones se ha completado.');
      },
    });
  }

  /**
   * Selects a projection.
   *
   * @param {Projection} projection - The projection to be selected.
   */
  selectProjection(projection: Projection) {
    this.selectedProjection = this.deepCopy(projection);
    this.originalProjection = projection;
  }

  /**
   * Submitthe projection.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  submitProjection() {
    if (this.selectedProjection) {
      if (this.selectedProjection.id === '--New Projection--') {
        const newName = window.prompt(
          'Introduce el nuevo nombre de la projecciones'
        );

        if (newName === null || newName.trim() === '') {
          console.log('Envío cancelado');
          return;
        }

        const doesExist = this.projections.some(
          (projection) => projection.id === newName
        );

        if (doesExist) {
          window.alert(
            'Ya existe una projecciones con el mismo nombre. Por favor, elige otro nombre.'
          );
          return;
        } else {
          this.selectedProjection.id = newName;
        }
      }
      if (
        JSON.stringify(this.originalProjection) ===
        JSON.stringify(this.selectedProjection)
      ) {
        console.log('Ningún cambio detectado, envío cancelado.');
        return;
      }

      if (this.selectedProjection != null) {
        this.deleteProjection();
      }

      this.adminEditorService.addProjection(this.selectedProjection).subscribe({
        next: (data: Projection[]) => {
          console.log('projecciones agregada o actualizada exitosamente.');
          this.projections = data;
        },
        error: (err: any) => {
          console.error('Error al agregar o actualizar la projecciones:', err);
          // Aquí puedes agregar más manejo de errores
        },
        complete: () => {
          console.log('La operación de agregar o actualizar se ha completado.');
        },
      });
    }
  }

  /**
   * Deletes the selected projection.
   *
   * @return {void}
   */
  deleteProjection() {
    if (this.selectedProjection) {
      this.adminEditorService
        .deleteProjection(this.selectedProjection)
        .subscribe({
          next: (data: Projection[]) => {
            console.log(
              'projecciones borrada exitosamente:',
              this.selectedProjection
            );
            this.clearData();
            this.projections = data;
          },
          error: (err: any) => {
            console.error('Error al borrar la projecciones:', err);
            if (err.status === 404) {
              console.log('La projecciones no se encontró.');
            } else {
              console.log('Ocurrió un error desconocido.', err);
            }
          },
          complete: () => {
            console.log('La operación de borrado se ha completado.');
          },
        });
    }
  }

  /**
   * Adds a new projection.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  addNewProjection() {
    this.originalProjection = null;
    this.loadProjections();
    this.selectedProjection = {
      id: '--New Projection--',
      horary: '',
      roomid: '',
      movieid: '',
    };
  }

  //
  //
  // ROOMS
  //
  //

  /**
   * Loads the rooms by making a request to the admin editor service.
   *
   * @return {void}
   */
  loadRooms() {
    this.adminEditorService.getRooms().subscribe({
      next: (data: Room[]) => {
        this.rooms = data; // Actualiza la variable de clase rooms con los datos recibidos
        console.log('Salases cargadas exitosamente.');
      },
      error: (err: any) => {
        console.error('Error al cargar las sucursales:', err);
        if (err.status === 404) {
          console.log('No se encontraron sucursales.');
        } else {
          console.log('Ocurrió un error desconocido.', err);
        }
      },
      complete: () => {
        // Código a ejecutar cuando el observable se completa, si es necesario.
        console.log('La carga de sucursales se ha completado.');
      },
    });
  }

  /**
   * Selects a room.
   *
   * @param {Room} room - The room to be selected.
   */
  selectRoom(room: Room) {
    this.selectedRoom = this.deepCopy(room);
    this.originalRoom = room;
  }

  /**
   * Submitthe room.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  submitRoom() {
    if (this.selectedRoom) {
      if (this.selectedRoom.id === '--New Room--') {
        const newName = window.prompt('Introduce el nuevo nombre de la sala');

        if (newName === null || newName.trim() === '') {
          console.log('Envío cancelado');
          return;
        }

        const doesExist = this.rooms.some((room) => room.id === newName);

        if (doesExist) {
          window.alert(
            'Ya existe una sala con el mismo nombre. Por favor, elige otro nombre.'
          );
          return;
        } else {
          this.selectedRoom.id = newName;
        }
      }
      if (
        JSON.stringify(this.originalRoom) === JSON.stringify(this.selectedRoom)
      ) {
        console.log('Ningún cambio detectado, envío cancelado.');
        return;
      }

      if (this.selectedRoom != null) {
        this.deleteRoom();
      }

      this.adminEditorService.addRoom(this.selectedRoom).subscribe({
        next: (data: Room[]) => {
          console.log('sala agregada o actualizada exitosamente.');
          this.rooms = data;
        },
        error: (err: any) => {
          console.error('Error al agregar o actualizar la sala:', err);
          // Aquí puedes agregar más manejo de errores
        },
        complete: () => {
          console.log('La operación de agregar o actualizar se ha completado.');
        },
      });
    }
  }

  /**
   * Adds a new item to the "projectionid" array of the selected room, if the
   * selected room and "projectionid" array exist.
   * @return {void} This function does not return anything.
   */
  addProjectionid() {
    if (this.selectedRoom && this.selectedRoom.projectionid) {
      this.selectedRoom.projectionid.push('');
    }
  }

  /**
   * Removes an element from the `projectionid` array of the `selectedRoom`
   * object at the specified index.
   *
   * @param {number} index - The index of the element to be removed.
   * @return {void} This function does not return anything.
   */
  removeProjectionid(index: number) {
    if (this.selectedRoom && this.selectedRoom.projectionid) {
      this.selectedRoom.projectionid.splice(index, 1);
    }
  }

  /**
   * Retrieves the safe projectionid at the specified index.
   *
   * @param {number} i - The index of the projectionid to retrieve.
   * @return {string} The safe projectionid at the specified index, or an
   * empty string if it does not exist.
   */
  getSafeProjectionid(i: number): string {
    if (
      this.selectedRoom &&
      this.selectedRoom.projectionid &&
      this.selectedRoom.projectionid.length > i
    ) {
      return this.selectedRoom.projectionid[i];
    }
    return '';
  }

  /**
   * Sets the value of a specific element in the 'projectionid' array of the
   * selected room.
   *
   * @param {number} i - The index of the element to set.
   * @param {string} value - The value to set.
   * @return {void} This function does not return any value.
   */
  setSafeProjectionid(i: number, value: string): void {
    if (
      this.selectedRoom &&
      this.selectedRoom.projectionid &&
      this.selectedRoom.projectionid.length > i
    ) {
      this.selectedRoom.projectionid[i] = value;
    }
  }

  /**
   * Deletes a room.
   *
   * @return {void} This function does not return anything.
   */
  deleteRoom() {
    if (this.selectedRoom) {
      this.adminEditorService.deleteRoom(this.selectedRoom).subscribe({
        next: (data: Room[]) => {
          console.log('sala borrada exitosamente:', this.selectedRoom);
          this.clearData();
          this.rooms = data;
        },
        error: (err: any) => {
          console.error('Error al borrar la sala:', err);
          if (err.status === 404) {
            console.log('La sala no se encontró.');
          } else {
            console.log('Ocurrió un error desconocido.', err);
          }
        },
        complete: () => {
          console.log('La operación de borrado se ha completado.');
        },
      });
    }
  }

  /**
   * Initializes a new room by setting the original room to null,
   * loading the rooms, and setting the selected room to a new room object
   * with default values.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  addNewRoom() {
    this.originalRoom = null;
    this.loadRooms();
    this.selectedRoom = {
      id: '--New Room--',
      rows: 0,
      columns: 0,
      theatername: '',
      projectionid: [],
    };
  }
}
