/* The code is defining an interface called `Movie`. An interface in TypeScript is a way to define the structure of an object. In this case, the `Movie` interface has several properties: */
export interface Movie {
  oname: string;
  cname: string;
  rating: string;
  director: string;
  duration: string;
  image: string;
  prota: string[];
}

/* The code is creating an array called `moviesExample` which contains two objects. Each object represents a movie and follows the structure defined by the `Movie` interface. Each movie object has properties such as `oname` (original name), `cname` (translated name), `rating`, `director`, `duration`, `image`, and `prota` (an array of main actors/actresses). The objects in the `moviesExample` array represent the movies "The Dark Knight" and "Star Wars: The Empire Strikes Back" along with their respective details. */
export const moviesExample: Movie[] = [
  {
    oname: 'The Dark Knight',
    cname: 'El Cabellero de la Noche',
    rating: 'EA',
    director: 'Christofer Nolan',
    duration: '02:40:00',
    image:
      'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg',
    prota: [
      'Christian Bale',
      'Heath Ledger',
      'Gary Oldman',
      'Aaron Eckhart',
      'Morgan Freeman',
      'Michael Caine',
      'Maggie Gyllenhaal',
    ],
  },
  {
    oname: 'Star Wars: The Empire Strikes Back',
    cname: 'Star Wars: El Imperio Contraataca',
    rating: 'EA',
    director: 'Irvin Kershner',
    duration: '01:04:00',
    image:
      'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg',
    prota: [
      'Mark Hamill',
      'Harrison Ford',
      'Carrie Fisher',
      'Billy Dee Williams',
      'Peter Mayhew',
      'Frank Oz',
      'Anthony Daniels',
    ],
  },
];
