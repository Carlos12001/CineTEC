using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    public class Cinema
    {
        public string TheaterName { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public int RoomsAmount { get; set; }
        public List<int> RoomID { get; set; }
    }
}