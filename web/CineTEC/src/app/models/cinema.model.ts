/* The `export interface Cinema` is defining the structure of an object that represents a cinema. It has the following properties: */
export interface Cinema {
  name: string;
  province: string;
  country: string;
  roomsamount: number;
  roomid: string[];
}

/* The `export const cinemasExample` is an array of objects that represents a list of cinemas. Each object in the array represents a cinema and has properties such as `name`, `province`, `country`, `roomsamount`, and `roomid`. */
export const cinemasExample: Cinema[] = [
  {
    name: 'cineTEC',
    province: 'Cartago',
    country: 'Costa Rica',
    roomsamount: 2,
    roomid: ['room2', 'room3'],
  },
  {
    name: 'cineTEC2',
    province: 'Puntarenas',
    country: 'Costa Rica',
    roomsamount: 1,
    roomid: ['room1'],
  },
];
