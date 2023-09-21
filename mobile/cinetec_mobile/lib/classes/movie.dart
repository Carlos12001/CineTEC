class Movie {
  String oname;
  String cname;
  String imagen;
  int duration; // Duración en minutos
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

    factory Movie.fromJson(Map<String, dynamic> json) {
    return Movie(
      oname: json['oname'],
      cname: json['cname'],
      imagen: json['imagen'],
      duration: json['duration'],
      prota: json['prota'],
      director: json['director'],
      rating: json['rating'],
    );
  }
}
