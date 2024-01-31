using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace PedalPricerAPI.Models
{
    public class Pedal
    {
        public int PedalId { get; set; }
        public string PedalBrand { get; set; } = string.Empty;
        public string PedalName { get; set; } = string.Empty;
        public float PedalWidth { get; set; }
        public float PedalHeight { get; set; }
        public float PedalPrice { get; set; }
        public string PedalImageFilename { get; set; } = string.Empty;

    }
}
