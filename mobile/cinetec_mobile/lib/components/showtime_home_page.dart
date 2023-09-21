import 'package:cinetec_mobile/classes/movie.dart';
import 'package:cinetec_mobile/components/movie_details_page.dart';
import 'package:flutter/material.dart';

/// The function `carteleraHomePage` returns an expanded widget that displays a list of movies with
/// their details and allows navigation to a movie details page.
/// 
/// Args:
///   moviesList (List<Movie>): The moviesList parameter is a list of Movie objects.
/// 
/// Returns:
///   an Expanded widget.
Expanded carteleraHomePage(List<Movie>? moviesList) {
  return Expanded(
    flex: 4,
    child: FutureBuilder<List<Movie>>(
      future:
          obtenerListaDePeliculas(moviesList), // Aquí se supone que tendrías una función que retorna Future<List<Movie>>
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

              return InkWell(
                // Lógica para navegar a la nueva página
                onTap: () {
                  // Lógica para navegar a la nueva página
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MovieDetails(title: "Horarios",
                          pelicula:
                              peliculaActual), // Suponiendo que tienes una página llamada DetallePelicula
                    ),
                  );
                },
                child: SizedBox(
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
                                style: const TextStyle(color: Color(0xFFfdfcfc)),
                              ),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    "${peliculaActual.rating}",
                                    style: const TextStyle(color: Color(0xFFfdfcfc)),
                                  ),
                                  Text(
                                    "${peliculaActual.duration} min",
                                    style: const TextStyle(color: Color(0xFFfdfcfc)),
                                  ),
                                ],
                              ),
                              Text(
                                "Director: ${peliculaActual.director}",
                                style: const TextStyle(color: Color(0xFFfdfcfc)),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
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

/// The function "obtenerListaDePeliculas" returns a list of movies if the input list is not null,
/// otherwise it returns an empty list.
/// 
/// Args:
///   moviessList (List<Movie>): The parameter "moviessList" is a nullable List of Movie objects.
/// 
/// Returns:
///   The function `obtenerListaDePeliculas` returns a `Future` that resolves to a `List<Movie>`. If the
/// `moviessList` parameter is not null, it returns the `moviessList`. Otherwise, it returns an empty
/// list `[]`.
Future<List<Movie>> obtenerListaDePeliculas(List<Movie>? moviessList) async {
  if(moviessList != null){
    return moviessList;
  } else{
    return [];
  }
  
}
