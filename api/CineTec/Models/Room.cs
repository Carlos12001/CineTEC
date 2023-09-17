using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    public class Room
    {
        public int RoomID { get; set; }
        public int RowsNumber { get; set; }
        public int ColumnsNumber { get; set; }
        public string TheaterName { get; set; }
        public List<int> ProjectionID { get; set; }
    }
}