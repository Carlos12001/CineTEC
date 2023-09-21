import 'dart:convert';
import 'package:cinetec_mobile/classes/movie.dart';
import 'package:http/http.dart' as http;
import 'package:cinetec_mobile/classes/cinema.dart';

// Url de ngrok para acceder API
String baseURL = "https://4959-186-176-152-196.ngrok-free.app";

/* 
  Metodo encargado de obtener los cines desde la base de datos
  realiza una conexion mediante el API en IIS express 
*/
Future<List<Cinema>> fetchCinemas() async {
  final response = await http.get(Uri.parse("$baseURL/api/cinema"));
  if (response.statusCode == 200) {
    // Si el servidor devuelve una respuesta 200 OK,
    // entonces parsea el JSON.
    Iterable list = jsonDecode(response.body);
    return list.map((cinema) => Cinema.fromJson(cinema)).toList();
  } else {
    // Si el servidor no devuelve una respuesta 200 OK,
    // entonces lanza una excepción.
    throw Exception('Failed to load cinemas');
  }
}

/* 
  Metodo encargado de obtener las peliculas desde la base de datos
  realiza una conexion mediante el API en IIS express 
*/
Future<List<Movie>> fetchMovies() async {
  final response = await http.get(Uri.parse("$baseURL/api/movies"));
  if (response.statusCode == 200) {
    // Si el servidor devuelve una respuesta 200 OK,
    // entonces parsea el JSON.
    Iterable list = jsonDecode(response.body);
    return list.map((movie) => Movie.fromJson(movie)).toList();
  } else {
    // Si el servidor no devuelve una respuesta 200 OK,
    // entonces lanza una excepción.
    throw Exception('Failed to load movies');
  }
}

/* 
  Metodo encargado de obtener los paises de los cines
  retorna una lista de strings 
*/
List<String> countryCinema(List<Cinema>? cinemas) {
  // Utilizamos un Set para evitar países duplicados
  Set<String> countriesC = {};

  if (cinemas != null) {
    for (Cinema cinema in cinemas) {
      countriesC.add(cinema.country);
    }
  }

  // Convertimos el Set a List y lo retornamos
  return countriesC.toList();
}

/* 
  Metodo encargado de obtener las ciudades de los cines
  retorna una lista de strings 
*/
List<String> cityCinema(List<Cinema>? cinemas) {
  // Utilizamos un Set para evitar países duplicados
  Set<String> cityC = {};

  if (cinemas != null) {
    for (Cinema cinema in cinemas) {
      cityC.add(cinema.province);
    }
  }

  // Convertimos el Set a List y lo retornamos
  return cityC.toList();
}

/* 
  Metodo encargado de obtener el nombre de los cines
  retorna una lista de strings 
*/
List<String> theaterCinema(List<Cinema>? cinemas) {
  // Utilizamos un Set para evitar países duplicados
  Set<String> theaterC = {};

  if (cinemas != null) {
    for (Cinema cinema in cinemas) {
      theaterC.add(cinema.name);
    }
  }

  // Convertimos el Set a List y lo retornamos
  return theaterC.toList();
}
