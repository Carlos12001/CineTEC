import 'package:cinetec_mobile/components/ads_home_page.dart';
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
      body: Column(
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
      ),
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
          activeIcon: Icon(Icons.star_border_outlined, color: Color(0xFF01528f)),
        ),
      ],
      currentIndex: _selectedIndex,
      selectedItemColor: Colors.white, // Color de la letra cuando está activo
      unselectedItemColor:
          Colors.grey, // Color de la letra cuando no está activo
      onTap: _onItemTapped,
    );
  }
}
