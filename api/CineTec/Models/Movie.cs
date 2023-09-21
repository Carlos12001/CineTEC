using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    //Clase Movie used to store temporally data relationed with the object.
    public class Movie
    {
        //sets and gets for every property
        public string rating { get; set; }
        public string director { get; set; }
        public string duration { get; set; }
        public string image { get; set; }
        public string cname { get; set; }
        public string oname { get; set; }
        public List<string> prota { get; set; }

    }
}