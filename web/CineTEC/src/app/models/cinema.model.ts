export interface Cinema {
  name: string;
  province: string;
  country: string;
  roomsamount: number;
  roomid: string[];
}

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
