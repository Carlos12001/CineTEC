﻿using CineTec.Models;
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
    public class adminController : ApiController
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

        //GET api/Admin
        public IEnumerable<Admin> Get()
        { 
            return admins;
        }

        //GET api/Admin/pedro@cinema.com
        [HttpGet]
        public bool Get(string email, string password)
        {
            var found = admins.Find(a => a.email == email && a.password == password);
            if (found != null)
            {
                return true;
            }
            return false;
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
        public string Delete(string id)
        {
            Admin adminToRemove = admins.Find(admin => admin.id == id);

            if (adminToRemove != null)
            {
                admins.Remove(adminToRemove);

                string newJson = JsonConvert.SerializeObject(admins, Formatting.Indented);
                File.WriteAllText(pathadmin, newJson);
                return "Admin deleted";
            }
            return "Error 404: admin not found";
        }
       
    }
}
