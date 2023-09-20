import 'package:cinetec_mobile/main.dart';
import 'package:flutter/material.dart';

class SeatSelectionPage extends StatefulWidget {
  final String nameMovie;
  final String time;

  SeatSelectionPage({required this.nameMovie, required this.time});

  @override
  _SeatSelectionPageState createState() => _SeatSelectionPageState();
}

class _SeatSelectionPageState extends State<SeatSelectionPage> {
  List<List<bool>> seats =
      List.generate(4, (index) => List.generate(3, (index) => false));

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
                // TODO: Navegar a la página de confirmación u otra acción
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
