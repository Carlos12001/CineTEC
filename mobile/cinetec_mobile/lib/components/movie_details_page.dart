import 'package:cinetec_mobile/classes/movie.dart';
import 'package:cinetec_mobile/components/seat_selection_page.dart';
import 'package:flutter/material.dart';

/// The `MovieDetails` class is a stateful widget that displays the details of a movie, including its
/// title and information about the movie itself.
class MovieDetails extends StatefulWidget {
  const MovieDetails({super.key, required this.title, required this.pelicula});

  final String title;
  final Movie pelicula;

  @override
  State<MovieDetails> createState() => _MovieDetailsState();
}

/// The `_MovieDetailsState` class is responsible for displaying movie details and allowing the user to
/// select a showtime and proceed to seat selection.
class _MovieDetailsState extends State<MovieDetails> {

  // TODO agregar lectura de la BD
  List<String> times = ["10:00", '15:00', '22:00'];
  String? selectedTime;

/// The `_showErrorDialog` function displays an error dialog with a title, content, and an OK button
/// that closes the dialog when pressed.
/// 
/// Args:
///   context (BuildContext): The `BuildContext` object represents the location in the widget tree where
/// the dialog should be shown. It is typically obtained from the `BuildContext` parameter of the
/// enclosing widget's build method.
/// 
/// Returns:
///   The `_showErrorDialog` function returns an `AlertDialog` widget.
    void _showErrorDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: const Text('Por favor selecciona el horario'),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop(); // Cierra el diálogo
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Movie peliculaN = widget.pelicula;
    return Scaffold(
      backgroundColor: const Color(0xFF222222),
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: Center(
            child: Text(
          widget.title,
          style: const TextStyle(color: Color(0xFFfdfcfc)),
        )),
      ),
      body: Container(
          alignment: Alignment.center,
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    SizedBox(
                      width: 150,
                      height: 170,
                      child: FittedBox(
                          fit: BoxFit.fill,
                          child: Image.network(peliculaN.imagen)),
                    ),
                    Column(
                      children: [
                        Text(
                          peliculaN.cname,
                          style: const TextStyle(color: Color(0xFFfdfcfc)),
                        ),
                        Text(
                          peliculaN.director,
                          style: const TextStyle(color: Color(0xFFfdfcfc)),
                        ),
                        Text(
                          peliculaN.duration.toString(),
                          style: const TextStyle(color: Color(0xFFfdfcfc)),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                color: const Color(0xFF404040),
                child: const Center(
                    child: Text(
                  "Horarios disponibles",
                  style: TextStyle(
                    fontSize: 24.0, // TODO hacer constantes globales
                    color: Colors.white,
                  ),
                )),
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    DropdownButton<String>(
                      dropdownColor: const Color(0xFF404040),
                      value: selectedTime,
                      hint: const Text(
                        'Selecciona un horario',
                        style: TextStyle(color: Colors.white),
                      ),
                      items: times.map((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(
                            value,
                            style: const TextStyle(color: Colors.white),
                          ),
                        );
                      }).toList(),
                      onChanged: (newValue) {
                        setState(() {
                          selectedTime = newValue;
                        });
                      },
                    ),
                    ElevatedButton(
                      onPressed: () {
                        if (selectedTime != null){
                          Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => SeatSelectionPage(nameMovie: peliculaN.cname , time: selectedTime!)),
                        );
                        } else {
                          _showErrorDialog(context);
                        }
                       
                      },
                      child: const Text("Reservar asientos"),
                    ),
                  ],
                ),
              ),
            ],
          )),
    );
  }
}