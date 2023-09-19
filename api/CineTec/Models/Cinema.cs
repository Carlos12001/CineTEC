﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CineTec.Models
{
    public class Cinema
    {
        public string name { get; set; }
        public string province { get; set; }
        public string country { get; set; }
        public int roomsamount { get; set; }
        public List<int> roomid { get; set; }
    }
}