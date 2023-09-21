
/* 
 Clase encargada de manejar la información de cada cine
 Parametros: nombre, provincia, pais, numero de salas, id sala
 */
class Cinema {
  String name;
  String province;
  String country;
  int roomsamount;
  List<int> roomid;

  // Constructor
  Cinema(
      {required this.name,
      required this.province,
      required this.country,
      required this.roomsamount,
      required this.roomid});

  // Metodo que permite construir un objeto cine a partir de un json
  factory Cinema.fromJson(Map<String, dynamic> json) {
    return Cinema(
      name: json['name'],
      province: json['province'],
      country: json['country'],
      roomsamount: json['roomsamount'],
      roomid: [1,2], // revisar como pasar esto
    );
  }
}
