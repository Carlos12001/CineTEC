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


        /*
        * Get
        * Retrieves a list with every cinema object from the stored data.
        */
        [HttpGet]
        [Route("api/cinema")]
        public IEnumerable<Cinema> Get()
        {
            return cinemas;
        }

        /*
        * Retrieves information about a Cinema by its name.
        *
        * @param cinemaData The Cinema object containing the name of the Cinema to retrieve.
        * @return An IHttpActionResult representing the result of the retrieval.
        */
        [HttpGet]
        [Route("api/cinema/find")]
        public IHttpActionResult Get([FromBody] Cinema cinemaData)
        {
            // Find the cinema with the specified id
            Cinema cinema = cinemas.FirstOrDefault(a => a.name == cinemaData.name);

            if (cinema == null)
            {
                return NotFound(); // Return a 404 Not Found response if the cinema is not found
            }

            return Ok(cinema); // Return a 200 OK response with the cinema data
        }

        /*
        * Adds a new Cinema to the system.
        *
        * @param cinemaData The Cinema object to be added.
        * @return An IHttpActionResult representing the result of the addition.
        */
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

            return Ok(cinemas);
        }

        /*
        * Deletes a Cinema from the system by its name.
        *
        * @param cinemaData The Cinema object containing the name of the Cinema to delete.
        * @return An IHttpActionResult representing the result of the deletion.
        */
        [HttpDelete]
        [Route("api/cinema/delete")]
        public IHttpActionResult Delete([FromBody] Cinema cinemaData)
        {
            Cinema cinemaToRemove = cinemas.Find(cinema => cinema.name == cinemaData.name);

            if (cinemaToRemove != null)
            {
                cinemas.Remove(cinemaToRemove);

                string newJson = JsonConvert.SerializeObject(cinemas, Formatting.Indented);
                File.WriteAllText(pathcinema, newJson);
                return Ok(cinemas);
            }
            return BadRequest("Wrong input or cinema not foundW!");
        }
    }
}