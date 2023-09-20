import { Component, OnInit } from '@angular/core';
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

  movies: Movie[] = [];

  ngOnInit(): void {
    this.dataAdmin = admin;
  }

  setSelectedEntity(entity: string) {
    this.selectedMovie = null;
    this.selectedEntity = entity;
  }
}
