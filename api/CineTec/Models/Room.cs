using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    public class Room
    {
        public int id { get; set; }
        public int rows { get; set; }
        public int columns { get; set; }
        public string name { get; set; }
        public List<int> projectionid { get; set; }
    }
}