using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    public class Movie
    {

        public int id { get; set; }
        public string rating { get; set; }
        public string director { get; set; }
        public string duration { get; set; }
        public string image { get; set; }
        public string cname { get; set; }
        public string oname { get; set; }
        public List<string> prota { get; set; }

    }
}