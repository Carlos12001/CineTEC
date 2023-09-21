import 'package:flutter/material.dart';

/// The SeatSelectionPage class is a StatefulWidget that represents a page for selecting seats for a
/// movie and time.
class SeatSelectionPage extends StatefulWidget {
  /// The `final String nameMovie;` is a final variable declaration in the `SeatSelectionPage` class. It
  /// is used to store the name of the movie for which the seats are being selected. The value of this
  /// variable is passed to the `SeatSelectionPage` widget when it is created.
  final String nameMovie;
 /// The `final String time;` is a final variable declaration in the `SeatSelectionPage` class. It is
 /// used to store the time of the movie for which the seats are being selected. The value of this
 /// variable is passed to the `SeatSelectionPage` widget when it is created.
  final String time;

/// The `const SeatSelectionPage({super.key, required this.nameMovie, required this.time});` is the
/// constructor of the `SeatSelectionPage` class. It takes three parameters: `key`, `nameMovie`, and
/// `time`.
  const SeatSelectionPage({super.key, required this.nameMovie, required this.time});

  @override
  // ignore: library_private_types_in_public_api
  _SeatSelectionPageState createState() => _SeatSelectionPageState();
}

/// The `_SeatSelectionPageState` class is a stateful widget that allows users to select seats for a
/// movie and displays a success dialog when the seats are confirmed.
class _SeatSelectionPageState extends State<SeatSelectionPage> {
/// The line `List<List<bool>> seats = List.generate(4, (index) => List.generate(3, (index) => false));`
/// is initializing a 2D list called `seats` with a size of 4 rows and 3 columns. Each element in the
/// list is initialized as `false`. This list is used to keep track of the selected seats in the seat
/// selection page.
  List<List<bool>> seats =
      List.generate(4, (index) => List.generate(3, (index) => false));

 /// The function `_showSuccessDialog` displays a success dialog with a title, content, and an OK button
 /// that closes the dialog and navigates back to different screens.
 /// 
 /// Args:
 ///   context (BuildContext): The context parameter is the BuildContext object that represents the
 /// current build context of the widget tree. It is used to access the current state of the widget and
 /// to navigate between different screens or widgets.
 /// 
 /// Returns:
 ///   The `_showSuccessDialog` function returns an `AlertDialog` widget.
  void _showSuccessDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Reserva para ${widget.nameMovie}'),
          content: Text('Tus asientos para la función de las ${widget.time} han sido reservados con éxito.'),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop(); // Cierra el diálogo
                Navigator.of(context).pop(); // vuelve a pelicula
                Navigator.of(context).pop(); // vuelve al inicio
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF222222),
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: const Center(
            child: Text("Selecciona tus asientos",
                style: TextStyle(color: Color(0xFFfdfcfc)))),
      ),
      body: Container(
        alignment: Alignment.center,
        child: Column(
          children: [
            Expanded(
              flex: 1,
              child: Container(
                  color: Colors.black,
                  child: const Center(
                    child: Text(
                      "Pantalla",
                      style: TextStyle(
                        color: Color(0xFFfdfcfc),
                      ),
                    ),
                  )),
            ),
            Expanded(
              flex: 4,
              child: GridView.builder(
                padding: const EdgeInsets.all(20),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3,
                  childAspectRatio: 2.0,
                ),
                itemCount: 12,
                itemBuilder: (context, index) {
                  int row = index ~/ 3;
                  int col = index % 3;
                  return Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {
                          seats[row][col] = !seats[row][col];
                        });
                      },
                      style: ElevatedButton.styleFrom(
                        primary: seats[row][col]
                            ? Colors.green
                            : Theme.of(context).colorScheme.primary,
                      ),
                      child: Text("Asiento ${index + 1}",
                          style: const TextStyle(color: Color(0xFFfdfcfc))),
                    ),
                  );
                },
              ),
            ),
            ElevatedButton(
              onPressed: () {
                _showSuccessDialog(context);
              },
              child: const Text("Confirmar asientos"),
            ),
          ],
        ),
      ),
    );
  }
}
