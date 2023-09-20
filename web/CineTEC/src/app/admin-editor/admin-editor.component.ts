import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  // Lista de entidades
  entities = [
    { label: 'Películas', value: 'movies' },
    { label: 'Sucursales', value: 'cinemas' },
    { label: 'Proyecciones', value: 'projections' },
    { label: 'Salas', value: 'room' },
  ];

  movies: Movie[] = moviesExample;

  ngOnInit(): void {
    this.dataAdmin = admin;
  }

  setSelectedEntity(entity: string) {
    this.selectedMovie = null;
    this.selectedEntity = entity;
  }

  updateMovie() {
    if (this.selectedMovie) {
      console.log('Actualizando película: ', this.selectedMovie);
    }
  }
  addProta() {
    if (this.selectedMovie && this.selectedMovie.prota) {
      this.selectedMovie.prota.push('');
    }
  }

  removeProta(index: number) {
    if (this.selectedMovie && this.selectedMovie.prota) {
      this.selectedMovie.prota.splice(index, 1);
    }
  }

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

  setSafeProta(i: number, value: string): void {
    if (
      this.selectedMovie &&
      this.selectedMovie.prota &&
      this.selectedMovie.prota.length > i
    ) {
      this.selectedMovie.prota[i] = value;
    }
  }
}
