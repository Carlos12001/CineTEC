﻿using CineTec.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using System.IO;

namespace CineTec.Controllers
{
    public class roomController : ApiController
    {
        static string pathroom = HttpContext.Current.Server.MapPath("~/Data_Storage/rooms.json");
        static string jsonrooms = File.ReadAllText(pathroom);
        static List<Room> rooms = JsonConvert.DeserializeObject<List<Room>>(jsonrooms);


        [HttpGet]
        public IEnumerable<Room> Get()
        {
            return rooms;
        }


        [HttpGet]
        public bool Get(int id)
        {
            var found = rooms.Find(a => a.id == id);
            if (found != null)
            {
                return true;
            }
            return false;
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
        public IHttpActionResult Delete(int id)
        {
            Room roomToRemove = rooms.Find(room => room.id == id);

            if (roomToRemove != null)
            {
                rooms.Remove(roomToRemove);

                string newJson = JsonConvert.SerializeObject(rooms, Formatting.Indented);
                File.WriteAllText(pathroom, newJson);
                return Ok("Movie sucefully deleted");
            }
            return BadRequest("Wrong input or movie not foundW!");
        }

    }
}