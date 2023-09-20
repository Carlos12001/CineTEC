using CineTec.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CineTec.Controllers
{
    public class projectionController : ApiController
    {
        static string pathprojection = HttpContext.Current.Server.MapPath("~/Data_Storage/projections.json");
        static string jsonprojections = File.ReadAllText(pathprojection);
        static List<Projection> projections = JsonConvert.DeserializeObject<List<Projection>>(jsonprojections);


        [HttpGet]
        [Route("api/projection")]
        public IEnumerable<Projection> Get()
        {
            return projections;
        }


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