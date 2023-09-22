/* 
 Clase encargada de manejar la información de cada cine
 Parametros: nombre, provincia, pais, numero de salas, id sala
 */
class Cinema {
  String name;
  String province;
  String country;
  int roomsamount;
  List<String> roomid;

  /// The code snippet is defining a constructor for the `Cinema` class in Dart.

  Cinema(
      {required this.name,
      required this.province,
      required this.country,
      required this.roomsamount,
      required this.roomid});

  /// The function is a factory constructor in Dart that creates a Cinema object from a JSON map.
  ///
  /// Args:
  ///   json (Map<String, dynamic>): A JSON object containing the cinema data.
  ///
  /// Returns:
  ///   an instance of the Cinema class.
  factory Cinema.fromJson(Map<String, dynamic> json) {
    return Cinema(
      name: json['name'],
      province: json['province'],
      country: json['country'],
      roomsamount: json['roomsamount'],
      roomid: ["1", "2"], // revisar como pasar esto
    );
  }
}
