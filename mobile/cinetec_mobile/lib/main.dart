import 'package:cinetec_mobile/classes/bd_manager.dart';
import 'package:cinetec_mobile/classes/cinema.dart';
import 'package:cinetec_mobile/classes/movie.dart';
import 'package:cinetec_mobile/components/ads_home_page.dart';
import 'package:cinetec_mobile/components/showtime_home_page.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

/// The `MyApp` class is a StatelessWidget that represents the main application widget for a mobile app
/// called "cineTEC mobile".
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // Widget principal
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
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

/// The `MyHomePage` class is a stateful widget in Dart that represents a home page with a title.
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  /// The above code is declaring a final variable named "title" of type String in the Dart programming
  /// language.
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

/// The `_MyHomePageState` class is a stateful widget that represents the state of the home page in a
/// movie app, including the selected index, selected country, city, cinema, and lists of cinemas and
/// movies.
class _MyHomePageState extends State<MyHomePage> {
  /// The above code is declaring a private integer variable named `_selectedIndex` and initializing it
  /// with the value 1.
  int _selectedIndex = 1;

  /// The above code is declaring a variable named "selectedCountry" of type String with a nullable
  /// type.
  String? selectedCountry;

  /// The above code is declaring a variable named "selectedCity" of type String with a nullable type.
  String? selectedCity;

  /// The above code is declaring a variable named "selectedCinema" of type String with a nullable type
  /// modifier.
  String? selectedCinema;

  /// The above code is declaring a nullable list variable called "cinemas" that can hold objects of
  /// type "Cinema".
  List<Cinema>? cinemas;

  /// The above code is declaring a nullable list variable named "movies" that can hold objects of type
  /// "Movie" in the Dart programming language.
  List<Movie>? movies;
  String? error;

  /// The initState function is being overridden to call the _fetchCinemas function when the state is
  /// initialized.
  @override
  void initState() {
    super.initState();
    _fetchCinemas();
    _fetchMovies();
  }

  /// The function `_fetchCinemas` fetches cinemas and movies, updates the state with the fetched data,
  /// and handles any errors that occur during the process.
  _fetchCinemas() async {
    try {
      List<Cinema> fetchedCinemas = await fetchCinemas();
      setState(() {
        print("fetched cinemas");
        cinemas = fetchedCinemas;
      });
    } catch (e) {
      setState(() {
        error = "Failed to fetch cinemas. ${e.toString()}";
        print(error);
      });
    }
  }

  /// The function `_fetchMovies` fetches movies and updates the state with the fetched movies or an error
  /// message if the fetch fails.
  _fetchMovies() async {
    try {
      List<Movie> fetchedMovies = await fetchMovies();
      setState(() {
        print("fetched movies");
        movies = fetchedMovies;
      });
    } catch (e) {
      setState(() {
        error = "Failed to fetch movies. ${e.toString()}";
        print(error);
      });
    }
  }

  /// The function updates the selected index and triggers a state change.
  ///
  /// Args:
  ///   index (int): The index parameter represents the index of the item that was tapped. It is used to
  /// update the _selectedIndex variable, which is typically used to keep track of the currently selected
  /// item in a list or menu.
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
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
        homePage(movies),
        locationPage(cinemas),
        Container(
          color: Color(0xFF222222),
          alignment: Alignment.center,
          child: const Text(
            'Proximamente...',
            style: const TextStyle(fontSize: 30, color: Color(0xFFfdfcfc)),
          ),
        ),
      ][_selectedIndex],
    );
  }

  /// The `homePage` function returns a `Column` widget that displays an ad, a header, and a list of
  /// movies.
  ///
  /// Args:
  ///   moviesList (List<Movie>): The moviesList parameter is a list of Movie objects.
  ///
  /// Returns:
  ///   a Column widget.
  Column homePage(List<Movie>? moviesList) {
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
        carteleraHomePage(moviesList),
      ],
    );
  }

  /// The `homeNavigationBar` function returns a `BottomNavigationBar` widget with three items: "Inicio",
  /// "Cine", and "Estrenos".
  ///
  /// Returns:
  ///   a BottomNavigationBar widget.
  BottomNavigationBar homeNavigationBar() {
    return BottomNavigationBar(
      backgroundColor: const Color(0xFF222222),
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

  /// The above code is creating a widget called `locationPage` in Dart language. This widget displays a
  /// form where users can select a country, city, and cinema from dropdown menus. The selected values
  /// are stored in variables `selectedCountry`, `selectedCity`, and `selectedCinema`. There is also a
  /// button to save the selected location. The widget is organized using a `Column` widget and contains
  /// various `Text`, `DropdownButton`, and `ElevatedButton` widgets to create the form.
  Column locationPage(List<Cinema>? cinemasList) {
    /// The line `List<String> countries = countryCinema(cinemasList);` is calling a function
    /// `countryCinema` and assigning the returned value to the variable `countries`. The
    /// `countryCinema` function takes a list of `Cinema` objects as an argument and returns a list of
    /// country names extracted from those objects. So, `countries` will contain a list of country names
    /// extracted from the `cinemasList`.
    List<String> countries = countryCinema(cinemasList);

    /// The line `List<String> cities = cityCinema(cinemasList);` is calling a function `cityCinema` and
    /// assigning the returned value to the variable `cities`. The `cityCinema` function takes a list of
    /// `Cinema` objects as an argument and returns a list of city names extracted from those objects.
    /// So, `cities` will contain a list of city names extracted from the `cinemasList`.
    List<String> cities = cityCinema(cinemasList);

    /// The line `List<String> cinemas = theaterCinema(cinemasList)` is calling a function
    /// `theaterCinema` and assigning the returned value to the variable `cinemas`. The `theaterCinema`
    /// function takes a list of `Cinema` objects as an argument and returns a list of cinema names
    /// extracted from those objects. So, `cinemas` will contain a list of cinema names extracted from
    /// the `cinemasList`.
    List<String> cinemas = theaterCinema(cinemasList);

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
            color: const Color(0xFF404040),
            padding: const EdgeInsets.all(50.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text(
                  "País",
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
                DropdownButton<String>(
                  dropdownColor: const Color(0xFF404040),
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
                        style: const TextStyle(color: Colors.white),
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
                  dropdownColor: const Color(0xFF404040),
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
                        style: const TextStyle(color: Colors.white),
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
                  dropdownColor: const Color(0xFF404040),
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
                        style: const TextStyle(color: Colors.white),
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
                    //print("Seleccion");
                    if (cinemasList != null) {
                      print(cinemasList.length);
                    } else {
                      print("vacio");
                    }
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
