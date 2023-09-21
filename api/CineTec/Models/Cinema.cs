using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    //Clase Cinema used to store temporally data relationed with the object.
    public class Cinema
    {
        //sets and gets for every property
        public string name { get; set; }
        public string province { get; set; }
        public string country { get; set; }
        public int roomsamount { get; set; }
        public List<string> roomid { get; set; }
    }
}