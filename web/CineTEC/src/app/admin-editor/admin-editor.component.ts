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
  selectedEntity: string = '';

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
    this.selectedEntity = entity;
  }
}
