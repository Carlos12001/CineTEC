using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    //Clase Projection used to store temporally data relationed with the object.
    public class Projection
    {
        //sets and gets for every property
        public int id { get; set; }
        public DateTime horary { get; set; }
        public int roomid { get; set; }
        public string movieid { get; set; }
    }
}