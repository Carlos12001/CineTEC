using CineTec.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CineTec.Controllers
{
    public class RoomController : ApiController
    {
        static string pathroom = HttpContext.Current.Server.MapPath("~/Data_Storage/rooms.json");
        static string jsonrooms = File.ReadAllText(pathroom);
        static List<Room> rooms = JsonConvert.DeserializeObject<List<Room>>(jsonrooms);


        [HttpGet]
        [Route("api/room")]
        public IEnumerable<Room> Get()
        {
            return rooms;
        }


        [HttpGet]
        [Route("api/room/find")]
        public IHttpActionResult Get([FromBody] Room roomData)
        {
            // Find the room with the specified id
            Room room = rooms.FirstOrDefault(a => a.id == roomData.id);

            if (room == null)
            {
                return NotFound(); // Return a 404 Not Found response if the room is not found
            }

            return Ok(room); // Return a 200 OK response with the room data
        }

        [HttpPost]
        [Route("api/room/add")]
        public IHttpActionResult Post([FromBody] Room roomData)
        {
            if (roomData == null)
            {
                return BadRequest("Invalid data for a movie");
            }

            // Add the received movieData to the list
            rooms.Add(roomData);

            // Serialize the updated list back to JSON and write it to the file
            string newJson = JsonConvert.SerializeObject(rooms, Formatting.Indented);
            File.WriteAllText(pathroom, newJson);

            return Ok("Room added successfully");
        }


        [HttpDelete]
        [Route("api/room/delete")]
        public IHttpActionResult Delete([FromBody] Room roomData)
        {
            Room roomToRemove = rooms.Find(room => room.id == roomData.id);

            if (roomToRemove != null)
            {
                rooms.Remove(roomToRemove);

                string newJson = JsonConvert.SerializeObject(rooms, Formatting.Indented);
                File.WriteAllText(pathroom, newJson);
                return Ok(rooms);
            }
            return BadRequest("Wrong input or movie not foundW!");
        }

    }
}