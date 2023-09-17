using CineTec.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;

namespace CineTec.Controllers
{
    public class CinemaController : ApiController
    {
        static string pathcinema = HttpContext.Current.Server.MapPath("~/Data_Storage/cinemas.json");
        static string jsoncinemas = File.ReadAllText(pathcinema);
        static List<Cinema> cinemas = JsonConvert.DeserializeObject<List<Cinema>>(jsoncinemas);


        [HttpGet]
        [Route("api/cinema")]
        public IEnumerable<Cinema> Get()
        {
            return cinemas;
        }


        [HttpGet]
        [Route("api/cinema/pick")]
        public IHttpActionResult Get(string name)
        {
            // Find the cinema with the specified id
            Cinema cinema = cinemas.FirstOrDefault(a => a.name == name);

            if (cinema == null)
            {
                return NotFound(); // Return a 404 Not Found response if the cinema is not found
            }

            return Ok(cinema); // Return a 200 OK response with the cinema data
        }

        [HttpPost]
        [Route("api/cinema/add")]
        public IHttpActionResult Post([FromBody] Cinema cinemaData)
        {
            if (cinemaData == null)
            {
                return BadRequest("Invalid data for a cinema");
            }

            // Add the received cinemaData to the list
            cinemas.Add(cinemaData);

            // Serialize the updated list back to JSON and write it to the file
            string newJson = JsonConvert.SerializeObject(cinemas, Formatting.Indented);
            File.WriteAllText(pathcinema, newJson);

            return Ok("Cinema added successfully");
        }


        [HttpDelete]
        [Route("api/cinema/delete")]
        public IHttpActionResult Delete(string name)
        {
            Cinema cinemaToRemove = cinemas.Find(cinema => cinema.name == name);

            if (cinemaToRemove != null)
            {
                cinemas.Remove(cinemaToRemove);

                string newJson = JsonConvert.SerializeObject(cinemas, Formatting.Indented);
                File.WriteAllText(pathcinema, newJson);
                return Ok("Cinema sucefully deleted");
            }
            return BadRequest("Wrong input or cinema not foundW!");
        }
    }
}