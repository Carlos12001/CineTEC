using CineTec.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;
using System.IO;

namespace CineTec.Controllers
{
    public class AdminController : ApiController
    {
        static string pathadmin = HttpContext.Current.Server.MapPath("~/Data_Storage/admins.json");
        static string jsonadmins = File.ReadAllText(pathadmin);
        static List<Admin> admins = JsonConvert.DeserializeObject<List<Admin>>(jsonadmins);

        /*
        public void updatejson() {
            // Lee el contenido del JSON desde un archivo o una cadena
            this.jsonadmins = File.ReadAllText(@"./admins.json");

            // Deserializa el JSON en una lista de objetos Admin
            this.admins = JsonConvert.DeserializeObject<List<Admin>>(jsonadmins);
        }
        */

        //static Dictionary<string, Admin> admins = new Dictionary<string, Admin>();

        [HttpGet]
        [Route("api/admin")]
        public IEnumerable<Admin> Get()
        { 
            return admins;
        }

        // Post api/Admin/pedro@cinema.com
        [HttpPost]
        [Route("api/admin/login")]
        public IHttpActionResult Login([FromBody] Admin adminData)
        {
            if (adminData == null)
            {
                return BadRequest("Invalid payload");
            }

            var found = admins.Find(a => a.email == adminData.email && a.password == adminData.password);
            if (found == null)
            {
                return NotFound();
            }
            
            return Ok(new {name=found.name }); // Retornamos el objeto Admin encontrado.
        }

        [HttpGet]
        [Route("api/admin/pick")]
        public IHttpActionResult Get(string email)
        {
            // Find the admin with the specified ID
            Admin admin = admins.FirstOrDefault(a => a.email == email);

            if (admin == null)
            {
                return NotFound(); // Return a 404 Not Found response if the admin is not found
            }

            return Ok(admin); // Return a 200 OK response with the admin data
        }
        /*
        //POST api/Admin
        public bool Post([FromBody] Admin admin)
        {
            Admin found;
            admins.TryGetValue(admin.Email, out found);
            if (found == null)
            {
                admins.Add(admin.Email, admin);
                return true;
            } else
            {
                return false;
            }
        }
        */
        [HttpPost]
        [Route("api/admin/add")]
        public IHttpActionResult Post([FromBody] Admin adminData)
        {
            if (adminData == null)
            {
                return BadRequest("Invalid data for admin");
            }

            // Add the received adminData to the list
            admins.Add(adminData);

            // Serialize the updated list back to JSON and write it to the file
            string newJson = JsonConvert.SerializeObject(admins, Formatting.Indented);
            File.WriteAllText(pathadmin, newJson);

            return Ok("Admin added successfully");
        }

        //DELETE api/Admin/pedro@cinema.com
        [HttpDelete]
        [Route("api/admin/delete")]
        public IHttpActionResult Delete(string id)
        {
            Admin adminToRemove = admins.Find(admin => admin.id == id);

            if (adminToRemove != null)
            {
                admins.Remove(adminToRemove);

                string newJson = JsonConvert.SerializeObject(admins, Formatting.Indented);
                File.WriteAllText(pathadmin, newJson);
                return Ok("Admin was deleted");
            }
            return BadRequest("Admin not found");
        }
       
    }
}
