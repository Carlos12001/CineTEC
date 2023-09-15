using CineTec.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace CineTec.Controllers
{
    public class AdminController : ApiController
    {
        static Dictionary<string, Admin> admins = new Dictionary<string, Admin>();

        //GET api/Admin
        public IEnumerable<Admin> Get()
        {
            return new List<Admin>(admins.Values);
        }

        //GET api/Admin/pedro@cinema.com
        public Admin Get(string Email)
        {
            Admin found;
            admins.TryGetValue(Email, out found);
            return found;
        }

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
        //DELETE api/Admin/pedro@cinema.com
        public bool Delete(string Email)
        {
            return admins.Remove(Email);
        }
    }
}
