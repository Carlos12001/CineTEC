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

  factory Cinema.fromJson(Map<String, dynamic> json) {
    return Cinema(
      name: json['name'],
      province: json['province'],
      country: json['country'],
      roomsamount: json['roomsamount'],
      roomid: json['roomid'],
    );
  }
}
