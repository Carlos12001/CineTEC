import 'package:cinetec_mobile/classes/movie.dart';
import 'package:flutter/material.dart';

Expanded carteleraHomePage() {
  return Expanded(
    flex: 4,
    child: FutureBuilder<List<Movie>>(
      future:
          obtenerListaDePeliculas(), // Aquí se supone que tendrías una función que retorna Future<List<Movie>>
      builder: (BuildContext context, AsyncSnapshot<List<Movie>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
              child:
                  CircularProgressIndicator()); // Muestra un indicador de progreso mientras se espera.
        } else if (snapshot.hasError) {
          return Text(
              'Error: ${snapshot.error}'); // Muestra un mensaje de error si algo sale mal.
        } else {
          List<Movie>? peliculas = snapshot.data;

          return ListView.separated(
            padding: const EdgeInsets.all(8),
            itemCount: peliculas!.length,
            itemBuilder: (context, index) {
              Movie peliculaActual = peliculas[index];

              return SizedBox(
                height: 150,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          width: 100,
                          height: 120,
                          child: FittedBox(
                              fit: BoxFit.fill,
                              child: Image.asset(peliculaActual.imagen)),
                        ),
                        Column(
                          children: [
                            Text(
                              "Pelicula: ${peliculaActual.cname}",
                              style: TextStyle(color: Color(0xFFfdfcfc)),
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "${peliculaActual.rating}",
                                  style: TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                                Text(
                                  "${peliculaActual.duration} min",
                                  style: TextStyle(color: Color(0xFFfdfcfc)),
                                ),
                              ],
                            ),
                            Text(
                              "Director: ${peliculaActual.director}",
                              style: TextStyle(color: Color(0xFFfdfcfc)),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
            separatorBuilder: (BuildContext context, int index) =>
                const Divider(),
          );
        }
      },
    ),
  );
}

Future<List<Movie>> obtenerListaDePeliculas() async {
  Movie pelicula1 = Movie(
      oname: "Star wars",
      cname: "Star wars",
      imagen: "lib/resources/pelicula1.jpg",
      duration: 123,
      prota: ["Anakin, asoka"],
      director: "Nolan",
      rating: "M12");
  Movie pelicula2 = Movie(
      oname: "The Dark Knight",
      cname: "El caballero de la noche",
      imagen: "lib/resources/pelicula2.jpg",
      duration: 152,
      prota: ["Christian Bale", "Heath Ledger"],
      director: "Christopher Nolan",
      rating: "M15");

  Movie pelicula3 = Movie(
      oname: "Inception",
      cname: "El origen",
      imagen: "lib/resources/pelicula3.jpg",
      duration: 148,
      prota: ["Leonardo DiCaprio", "Ellen Page"],
      director: "Christopher Nolan",
      rating: "M13");

  Movie pelicula4 = Movie(
      oname: "Avengers: Endgame",
      cname: "Avengers: Fin del juego",
      imagen: "lib/resources/pelicula4.jpg",
      duration: 181,
      prota: ["Robert Downey Jr.", "Chris Evans"],
      director: "Anthony and Joe Russo",
      rating: "M12");

  Movie pelicula5 = Movie(
      oname: "Jurassic Park",
      cname: "Parque Jurásico",
      imagen: "lib/resources/pelicula5.jpg",
      duration: 127,
      prota: ["Sam Neill", "Laura Dern"],
      director: "Steven Spielberg",
      rating: "M10");

  return [pelicula1, pelicula2, pelicula3, pelicula4, pelicula5];
}
