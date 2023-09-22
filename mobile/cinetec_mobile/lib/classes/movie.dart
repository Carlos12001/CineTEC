/* 
 Clase encargada de manejar la información de cada pelicula
 Parametros: nombre original, nombre comercial, path imagen, duracion, protagonistas
             director, puntuacion
 */
class Movie {
  String oname;
  String cname;
  String imagen;
  String duration; // Duración en minutos
  List<String> prota;
  String director;
  String rating;

  // Constructor
  Movie({
    required this.oname,
    required this.cname,
    required this.imagen,
    required this.duration,
    required this.prota,
    required this.director,
    required this.rating,
  });

  // Metodo que permite construir un objeto pelicula a partir de un json
  factory Movie.fromJson(Map<String, dynamic> json) {
    return Movie(
      oname: json['oname'],
      cname: json['cname'],
      imagen: json['image'],
      duration: json['duration'],
      prota: List<String>.from(json['prota']),
      director: json['director'],
      rating: json['rating'],
    );
  }
}
