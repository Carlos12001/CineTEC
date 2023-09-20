import 'dart:convert';

import 'package:http/http.dart' as http;

import 'package:cinetec_mobile/classes/cinema.dart';

Future<List<Cinema>> fetchCinemas() async {
  
  final response = await http.get(Uri.parse("https://968f-186-176-152-196.ngrok-free.app"));
  print(response.statusCode);
  if (response.statusCode == 200) {
    // Si el servidor devuelve una respuesta 200 OK,
    // entonces parsea el JSON.
    Iterable list = jsonDecode(response.body);
    return list.map((cinema) => Cinema.fromJson(cinema)).toList();
  } else {
    print("errorrrrr");
    // Si el servidor no devuelve una respuesta 200 OK,
    // entonces lanza una excepción.
    throw Exception('Failed to load cinemas');
  }
}