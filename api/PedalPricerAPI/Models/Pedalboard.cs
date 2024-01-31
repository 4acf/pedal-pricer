using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace PedalPricerAPI.Models
{
    public class Pedalboard
    {
        public int PedalboardId { get; set; }
        public string PedalboardBrand { get; set; } = string.Empty;
        public string PedalboardName { get; set; } = string.Empty;
        public float PedalboardWidth { get; set; }
        public float PedalboardHeight { get; set; }
        public float PedalboardPrice { get; set; }
        public string PedalboardImageFilename { get; set; } = string.Empty;

    }
}
