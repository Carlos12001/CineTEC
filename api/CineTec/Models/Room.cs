using System.Collections.Generic;

namespace CineTec.Models
{
    public class Room
    {
        public int id { get; set; }
        public int rows { get; set; }
        public int columns { get; set; }
        public string theatername { get; set; }
        public List<int> projectionid { get; set; }
    }
}