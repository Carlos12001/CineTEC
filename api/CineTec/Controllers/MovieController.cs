using CineTec.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using System.IO;
using System.Linq;

namespace CineTec.Controllers
{
    public class MovieController : ApiController
    {
        static string pathmovie = HttpContext.Current.Server.MapPath("~/Data_Storage/movies.json");
        static string jsonmovies = File.ReadAllText(pathmovie);
        static List<Movie> movies = JsonConvert.DeserializeObject<List<Movie>>(jsonmovies);


        /*
        * Get
        * Retrieves a list with every movie object from the stored data.
        */
        [HttpGet]
        [Route("api/movie")]
        public IEnumerable<Movie> Get()
        {
            return movies;
        }

        /*
        * Retrieves information about a Movie by its original name.
        *
        * @param movieData The Movie object containing the original name of the Movie to retrieve.
        * @return An IHttpActionResult representing the result of the retrieval.
        */
        [HttpGet]
        [Route("api/movie/find")]
        public IHttpActionResult Get([FromBody] Movie movieData)
        {
            // Find the movie with the specified id
            Movie movie = movies.FirstOrDefault(a => a.oname == movieData.oname);

            if (movie == null)
            {
                return NotFound(); // Return a 404 Not Found response if the movie is not found
            }

            return Ok(movie); // Return a 200 OK response with the movie data
        }

        /*
        * Adds a new Movie to the system.
        *
        * @param movieData The Movie object to be added.
        * @return An IHttpActionResult representing the result of the addition.
        */
        [HttpPost]
        [Route("api/movie/add")]
        public IHttpActionResult Post([FromBody] Movie movieData)
        {
            if (movieData == null)
            {
                return BadRequest("Invalid data for a movie");
            }

            // Add the received movieData to the list
            movies.Add(movieData);

            // Serialize the updated list back to JSON and write it to the file
            string newJson = JsonConvert.SerializeObject(movies, Formatting.Indented);
            File.WriteAllText(pathmovie, newJson);

            return Ok(movies);
        }

        /*
        * Deletes a Movie from the system by its original name.
        *
        * @param movieData The Movie object containing the original name of the Movie to delete.
        * @return An IHttpActionResult representing the result of the deletion.
        */
        [HttpDelete]
        [Route("api/movie/delete")]
        public IHttpActionResult Delete([FromBody] Movie movieData)
        {
            Movie movieToRemove = movies.Find(movie => movie.oname == movieData.oname);

            if (movieToRemove != null)
            {
                movies.Remove(movieToRemove);

                string newJson = JsonConvert.SerializeObject(movies, Formatting.Indented);
                File.WriteAllText(pathmovie, newJson);
                return Ok(movies);
            }
            return BadRequest("Wrong input or movie not found!");
        }

    }
}