using CineTec.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using System.IO;
using System.Linq;

namespace CineTec.Controllers
{
    public class projectionController : ApiController
    {
        static string pathprojection = HttpContext.Current.Server.MapPath("~/Data_Storage/projections.json");
        static string jsonprojections = File.ReadAllText(pathprojection);
        static List<Projection> projections = JsonConvert.DeserializeObject<List<Projection>>(jsonprojections);

        /*
        * Get
        * Retrieves a list with every room object from the stored data.
        */
        [HttpGet]
        [Route("api/projection")]
        public IEnumerable<Projection> Get()
        {
            return projections;
        }

        /*
        * Retrieves information about a Projection by its ID.
        *
        * @param projectionData The Projection object containing the ID of the Projection to retrieve.
        * @return An IHttpActionResult representing the result of the retrieval.
        */
        [HttpGet]
        [Route("api/projection/find")]
        public IHttpActionResult Get([FromBody] Projection projectionData)
        {
            // Find the projection with the specified id
            Projection projection = projections.FirstOrDefault(a => a.id == projectionData.id);

            if (projection == null)
            {
                return NotFound(); // Return a 404 Not Found response if the projection is not found
            }

            return Ok(projection); // Return a 200 OK response with the projection data
        }


        /*
        * Adds a new Projection to the system.
        *
        * @param projectionData The Projection object to be added.
        * @return An IHttpActionResult representing the result of the addition.
        */
        [HttpPost]
        [Route("api/projection/add")]
        public IHttpActionResult Post([FromBody] Projection projectionData)
        {
            if (projectionData == null)
            {
                return BadRequest("Invalid data for a projection");
            }

            // Add the received projectionData to the list
            projections.Add(projectionData);

            // Serialize the updated list back to JSON and write it to the file
            string newJson = JsonConvert.SerializeObject(projections, Formatting.Indented);
            File.WriteAllText(pathprojection, newJson);

            return Ok(projections);
        }

        /*
        * Deletes a Projection from the system by its ID.
        *
        * @param projectionData The Projection object containing the ID of the Projection to delete.
        * @return An IHttpActionResult representing the result of the deletion.
        */
        [HttpDelete]
        [Route("api/projection/delete")]
        public IHttpActionResult Delete([FromBody] Projection projectionData)
        {
            Projection projectionToRemove = projections.Find(projection => projection.id == projectionData.id);

            if (projectionToRemove != null)
            {
                projections.Remove(projectionToRemove);

                string newJson = JsonConvert.SerializeObject(projections, Formatting.Indented);
                File.WriteAllText(pathprojection, newJson);
                return Ok(projections);
            }
            return BadRequest("Wrong input or projection not found!");
        }
    }
}