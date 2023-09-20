import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

  Expanded adsHomePage() {
    return Expanded(
          flex: 2,
          child: ListView(
            children: [
              CarouselSlider(
                items: [
                  //1st Image of Slider
                  Container(
                    margin: const EdgeInsets.all(2.0),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8.0),
                      image: const DecorationImage(
                        // se puede cambiar por un networkImage
                        image: AssetImage("lib/resources/pelicula1.jpg"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
              
                  //2nd Image of Slider
                  Container(
                    margin: const EdgeInsets.all(2.0),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8.0),
                      image: const DecorationImage(
                        image: AssetImage("lib/resources/pelicula2.jpg"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
              
                  //3rd Image of Slider
                  Container(
                    margin: const EdgeInsets.all(2.0),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8.0),
                      image: const DecorationImage(
                        image: AssetImage("lib/resources/pelicula3.jpg"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
              
                  //4th Image of Slider
                  Container(
                    margin: const EdgeInsets.all(2.0),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8.0),
                      image: const DecorationImage(
                        image: AssetImage("lib/resources/pelicula4.jpg"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
              
                  //5th Image of Slider
                  Container(
                    margin: const EdgeInsets.all(2.0),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8.0),
                      image: const DecorationImage(
                        image: AssetImage("lib/resources/pelicula5.jpg"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ],
                options: CarouselOptions(
                  height: 180.0,
                  enlargeCenterPage: true,
                  autoPlay: true,
                  aspectRatio: 16 / 9,
                  autoPlayCurve: Curves.fastOutSlowIn,
                  enableInfiniteScroll: true,
                  autoPlayAnimationDuration:
                      const Duration(milliseconds: 800),
                  //viewportFraction: 1,
                ),
              ),
            ],
          ),
        );
  }