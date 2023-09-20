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

  selectedMovie: Movie | null = null;

  selectedEntity: string = '';

  entities = [
    { label: 'Películas', value: 'movies' },
    { label: 'Sucursales', value: 'cinemas' },
    { label: 'Proyecciones', value: 'projections' },
    { label: 'Salas', value: 'room' },
  ];

  movies: Movie[] = moviesExample;

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

  /**
   * Selects a movie.
   *
   * @param {Movie} movie - The movie to be selected.
   */
  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  /**
   * Sets the selected entity.
   *
   * @param {string} entity - The entity to set as selected.
   */
  setSelectedEntity(entity: string) {
    console.log('moivesExample: ', moviesExample);
    console.log('movies: ', this.movies);
    this.selectedMovie = null;
    this.selectedEntity = entity;
  }

  /**
   * Updates the movie.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  updateMovie() {
    if (this.selectedMovie) {
      console.log('Actualizando película: ', this.selectedMovie);
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
   * A function that tracks the index of an item.
   *
   * @param {number} index - The index of the item.
   * @param {any} item - The item being tracked.
   * @return {number} The index of the item.
   */
  trackByFunction(index: number, item: any): number {
    return index;
  }
}
