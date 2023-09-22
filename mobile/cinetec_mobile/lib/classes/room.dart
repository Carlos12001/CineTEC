/* 
 Clase encargada de manejar la información de cada pelicula
 Parametros: nombre original, nombre comercial, path imagen, duracion, protagonistas
             director, puntuacion
 */
class Room {
  String id;
  int rows;
  int columns;
  String theaterName; // Duración en minutos
  List<String> projectionId;
 

  // Constructor
  Room({
    required this.id,
    required this.rows,
    required this.columns,
    required this.theaterName,
    required this.projectionId,
  });

}
