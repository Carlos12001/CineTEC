import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminEditorService } from '../services/admin-editor.service';

import { Admin, admin } from '../models/admin.model';
import { Movie } from '../models/movies.model';
import { Cinema } from '../models/cinema.model';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css'],
})
export class AdminEditorComponent implements OnInit {
  dataAdmin: Admin | undefined;

  selectedEntity: string = '';

  entities = [
    { label: 'Películas', value: 'movies' },
    { label: 'Sucursales', value: 'cinemas' },
    { label: 'Proyecciones', value: 'projections' },
    { label: 'Salas', value: 'room' },
  ];

  movies: Movie[] = [];

  selectedMovie: Movie | null = null;

  originalMovie: Movie | null = null;

  cinemas: Cinema[] = [];

  selectedCinema: Cinema | null = null;

  originalCinema: Cinema | null = null;

  editingCinema: Cinema | null = null;

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

  clearData() {
    this.movies = [];
    this.selectedMovie = null;
    this.originalMovie = null;
    this.cinemas = [];
    this.selectedCinema = null;
    this.originalCinema = null;
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
  }

  //
  //
  // Movies
  //
  //

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

  loadCinemas() {
    this.adminEditorService.getCinemas().subscribe({
      next: (data: Cinema[]) => {
        this.cinemas = data; // Actualiza la variable de clase cinemas con los datos recibidos
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
}
