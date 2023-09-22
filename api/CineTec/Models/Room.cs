using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    //Clase Room used to store temporally data relationed with the object.
    public class Room
    {
        //sets and gets for every property
        public string id { get; set; }
        public int rows { get; set; }
        public int columns { get; set; }
        public string theatername { get; set; }
        public List<string> projectionid { get; set; }
    }
}