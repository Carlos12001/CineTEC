import 'package:cinetec_mobile/components/ads_home_page.dart';
import 'package:cinetec_mobile/components/location_page.dart';
import 'package:cinetec_mobile/components/showtime_home_page.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "cineTEC mobile",
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          primary: const Color(0xFF01528f),
          seedColor: Colors.blueGrey,
        ),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: "CineTEC"),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;
  String? selectedCountry;
  String? selectedCity;
  String? selectedCinema;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    int currentPageIndex = 0;
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
      bottomNavigationBar: homeNavigationBar(),
      body: <Widget>[
        homePage(),
        locationPage(),
        Container(
          color: Colors.blue,
          alignment: Alignment.center,
          child: const Text('Page 3'),
        ),
      ][_selectedIndex],
    );
  }

  Column homePage() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        adsHomePage(),
        Container(
          color: const Color(0xFF404040),
          child: const Center(
              child: Text(
            "Cartelera",
            style: TextStyle(
              fontSize: 24.0, // TODO hacer constantes globales
              color: Colors.white,
            ),
          )),
        ),
        carteleraHomePage(),
      ],
    );
  }

  BottomNavigationBar homeNavigationBar() {
    return BottomNavigationBar(
      backgroundColor: Color(0xFF222222),
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Inicio',
          activeIcon: Icon(Icons.home, color: Color(0xFF01528f)),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.location_city),
          label: "Cine",
          activeIcon: Icon(Icons.location_city, color: Color(0xFF01528f)),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.star_border_outlined),
          label: "Estrenos",
          activeIcon:
              Icon(Icons.star_border_outlined, color: Color(0xFF01528f)),
        ),
      ],
      currentIndex: _selectedIndex,
      selectedItemColor: Colors.white, // Color de la letra cuando está activo
      unselectedItemColor:
          Colors.grey, // Color de la letra cuando no está activo
      onTap: _onItemTapped,
    );
  }

  Column locationPage() {

    // Listas de opciones para los dropdowns obtener del json
    List<String> countries = ['USA', 'Canada', 'Mexico'];
    List<String> cities = ['City 1', 'City 2', 'City 3'];
    List<String> cinemas = ['Cinema 1', 'Cinema 2', 'Cinema 3'];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        const Expanded(
          flex: 1,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Icon(
                Icons.add_location,
                color: Colors.white,
                size: 50,
              ),
              Flexible(
                child: Text(
                  "Selecciona la ciudad que quieras visualizar en Cartelera",
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
              )
            ],
          ),
        ),
        Expanded(
          flex: 4,
          child: Container(
            color: Color(0xFF404040),
            padding: EdgeInsets.all(50.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text(
                  "País",
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
                DropdownButton<String>(
                  dropdownColor: Color(0xFF404040),
                  value: selectedCountry,
                  hint: const Text(
                    'Selecciona un pais',
                    style: TextStyle(color: Colors.white),
                  ),
                  items: countries.map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(
                        value,
                        style: TextStyle(color: Colors.white),
                      ),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() {
                      selectedCountry = newValue;
                    });
                  },
                ),
                const Text(
                  "Ciudad",
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
                DropdownButton<String>(
                  dropdownColor: Color(0xFF404040),
                  value: selectedCity,
                  hint: const Text(
                    'Selecciona una ciudad',
                    style: TextStyle(color: Colors.white),
                  ),
                  items: cities.map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(
                        value,
                        style: TextStyle(color: Colors.white),
                      ),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() {
                      selectedCity = newValue;
                    });
                  },
                ),
                const Text(
                  "Cine",
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
                DropdownButton<String>(
                  dropdownColor: Color(0xFF404040),
                  value: selectedCinema,
                  hint: const Text(
                    'Selecciona un cine',
                    style: TextStyle(color: Colors.white),
                  ),
                  items: cinemas.map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(
                        value,
                        style: TextStyle(color: Colors.white),
                      ),
                    );
                  }).toList(),
                  onChanged: (newValue) {
                    setState(() {
                      selectedCinema = newValue;
                    });
                  },
                ),
                ElevatedButton(
                  onPressed: () {
                    print("Seleccion");
                  },
                  child: const Text("Guarda mi ubicación"),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
