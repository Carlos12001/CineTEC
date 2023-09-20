using System;

namespace CineTec.Models
{
    public class Projection
    {
        public int id { get; set; }
        public DateTime horary { get; set; }
        public int roomid { get; set; }
        public string movieid { get; set; }
    }
}