using CineTec.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CineTec.Controllers
{
    public class MovieController : ApiController
    {
        static string pathmovie = HttpContext.Current.Server.MapPath("~/Data_Storage/movies.json");
        static string jsonmovies = File.ReadAllText(pathmovie);
        static List<Movie> movies = JsonConvert.DeserializeObject<List<Movie>>(jsonmovies);


        [HttpGet]
        [Route("api/movie")]
        public IEnumerable<Movie> Get()
        {
            return movies;
        }


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