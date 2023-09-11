import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_bases';
  pageTitle = 'Multicinemas pero mejor';
  currentYear = new Date().getFullYear();

  // Método para cambiar el título
  changeTitle() {
    this.pageTitle = 'Nuevo título'; // Cambia el título cuando se hace clic en el botón
  }
}
