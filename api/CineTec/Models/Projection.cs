using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    public class Projection
    {
        public int ProjectionID { get; set; }
        public DateTime Horary { get; set; }
        public int RoomID { get; set; }
        public int MovieID { get; set; }
    }
}