/// The `Projection` class represents a movie projection with properties such as id, horary, roomid, and
/// movieId.
class Projection {
  String id;
  String horary;
  String roomid;
  String movieId;

  // Constructor
  Projection({
    required this.id,
    required this.horary,
    required this.roomid,
    required this.movieId,
  });

  /// The function is a factory constructor in Dart that creates a Projection object from a JSON map.
  ///
  /// Args:
  ///   json (Map<String, dynamic>): A map containing the JSON data for a projection.
  ///
  /// Returns:
  ///   The `Projection` object is being returned.
  factory Projection.fromJson(Map<String, dynamic> json) {
    return Projection(
      id: json['id'],
      horary: json['horary'],
      roomid: json['roomid'],
      movieId: json['movieId'],
    );
  }
}
