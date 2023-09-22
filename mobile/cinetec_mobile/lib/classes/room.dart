/// The `Room` class represents a room in a theater, with properties such as id, number of rows and
/// columns, theater name, and a list of projection ids.
class Room {
  String id;
  int rows;
  int columns;
  String theaterName;
  List<String> projectionId;

  // Constructor
  Room({
    required this.id,
    required this.rows,
    required this.columns,
    required this.theaterName,
    required this.projectionId,
  });

  // Metodo que permite construir un objeto Room a partir de un json
  factory Room.fromJson(Map<String, dynamic> json) {
    return Room(
      id: json['id'],
      rows: json['rows'],
      columns: json['columns'],
      theaterName: json['theaterName'],
      projectionId: List<String>.from(json['projectionId']),
    );
  }
}
