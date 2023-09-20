using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{

    //Clase Admin used to store temporally data relationed with the object.
    public class Admin
    {
        //sets and gets for every property
        public string id { get; set; }
        public string password { get; set; }
        public string name { get; set; }
        public string email { get; set; }
    }
}