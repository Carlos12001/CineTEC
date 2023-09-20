import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Admin, admin } from '../models/admin.model';
import { Movie, moviesExample } from '../models/movies.model';

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

  movies: Movie[] = moviesExample;

  selectedMovie: Movie | null = null;

  originalMovie: Movie | null = null;

  editingMovie: Movie | null = null;

  constructor(private router: Router) {}

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
    this.selectedEntity = '';
    // this.movies = [];
    this.selectedMovie = null;
    this.originalMovie = null;
  }

  /**
   * Sets the selected entity.
   *
   * @param {string} entity - The entity to set as selected.
   */
  setSelectedEntity(entity: string) {
    this.clearData();
    this.selectedEntity = entity;
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
      console.log('Actualizando película: ', this.selectedMovie);
    }
    this.selectedMovie = null;
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
   * A function that tracks the index of an item.
   *
   * @param {number} index - The index of the item.
   * @param {any} item - The item being tracked.
   * @return {number} The index of the item.
   */
  trackByFunction(index: number, item: any): number {
    return index;
  }

  deleteMovie() {
    if (this.selectedMovie) {
      console.log('Borrando película: ', this.selectedMovie);
    }
    this.selectedMovie = null;
  }

  addNewMovie() {
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
}
