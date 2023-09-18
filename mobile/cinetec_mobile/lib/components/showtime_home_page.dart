import 'package:flutter/material.dart';

Expanded carteleraHomePage() {
  return Expanded(
    flex: 4,
    child: ListView.separated(
      padding: const EdgeInsets.all(8),
      itemCount: 10,
      itemBuilder: (context, index) {
        return SizedBox(
          height: 150,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  SizedBox(
                      width: 100,
                      height: 120,
                      child: FittedBox(
                          fit: BoxFit.fill,
                          child: Image.asset("lib/resources/pelicula3.jpg"))),
                  const Column(
                    children: [
                      Text(
                        "Pelicula: Rapidos y furiosos 23",
                        style: TextStyle(color: Color(0xFFfdfcfc)),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "M12",
                            style: TextStyle(color: Color(0xFFfdfcfc)),
                          ),
                          Text(
                            "91 min",
                            style: TextStyle(color: Color(0xFFfdfcfc)),
                          ),
                        ],
                      ),
                      Text(
                        "Director: Cristopher Nolan",
                        style: TextStyle(color: Color(0xFFfdfcfc)),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        );
      },
      separatorBuilder: (BuildContext context, int index) => const Divider(),
    ),
  );
}
