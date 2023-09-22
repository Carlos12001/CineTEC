import { Component } from '@angular/core';

@Component({
  selector: 'app-seating',
  templateUrl: './movie_client.component.html',
  styleUrls: ['./movie_client.component.css']
})
export class SeatingComponent {
  rows: any[][] = []; // Aquí debes definir tus propios datos de asientos

  constructor() {
    // Debes inicializar la matriz 'rows' con los datos de tus asientos
    // Por ejemplo, una matriz de filas y columnas
  }

  toggleSeatSelection(rowIdx: number, seatIdx: number) {
    this.rows[rowIdx][seatIdx].selected = !this.rows[rowIdx][seatIdx].selected;
  }
}
