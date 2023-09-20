using System.Collections.Generic;

namespace CineTec.Models
{
    public class Movie
    {
        public string rating { get; set; }
        public string director { get; set; }
        public string duration { get; set; }
        public string image { get; set; }
        public string cname { get; set; }
        public string oname { get; set; }
        public List<string> prota { get; set; }

    }
}