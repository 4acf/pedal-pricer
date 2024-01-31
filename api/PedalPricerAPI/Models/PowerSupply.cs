using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace PedalPricerAPI.Models
{
    public class PowerSupply
    {
        public int PowerSupplyId { get; set; }
        public string PowerSupplyBrand { get; set; } = string.Empty;
        public string PowerSupplyName { get; set; } = string.Empty;
        public float PowerSupplyWidth { get; set; }
        public float PowerSupplyHeight { get; set; }
        public float PowerSupplyPrice { get; set; }
        public string PowerSupplyImageFilename { get; set; } = string.Empty;

    }
}
