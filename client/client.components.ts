import { Component, OnInit } from '@angular/core';


interface Movie {
  title: string;
  image: string;
  synopsis: string;
  showSynopsis: boolean;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ImageClientComponent implements OnInit {
  images: string[] = [];
  movies: Movie[] = [];

  constructor() { }

  ngOnInit() {
    this.movies = [
      { title: 'Movie 1', image: 'meg2.jpg', synopsis: 'Sinopsis de la película 1', showSynopsis: false },
      { title: 'Movie 2', image: 'taylor.jpg', synopsis: 'Sinopsis de la película 2', showSynopsis: false },
      { title: 'Movie 3', image: 'thenun.jpg', synopsis: 'Sinopsis de la película 3', showSynopsis: false },
      { title: 'Movie 4', image: 'Resistencia.jpg', synopsis: 'Sinopsis de la película 4', showSynopsis: false }
    ];

    this.images = this.movies.map(movie => movie.image);
  }

  showSynopsis(index: number) {
    this.movies[index].showSynopsis = true;
  }

  hideSynopsis(index: number) {
    this.movies[index].showSynopsis = false;
  }

  nextButtonClick() {
    const lastIndex = this.images.length - 1;
    const lastImage = this.images[lastIndex];
    this.images = [lastImage, ...this.images.slice(0, lastIndex)];
  }
}

