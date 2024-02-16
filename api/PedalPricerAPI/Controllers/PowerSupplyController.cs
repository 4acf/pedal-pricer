using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PedalPricerAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace PedalPricerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PowerSupplyController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public PowerSupplyController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]

        public JsonResult Get(string item)
        {

            string[] items = item.Split(',');
            DataTable table = new DataTable();


            foreach (var powersupply in items)
            {
                string query = @"
                            select PowerSupplyID, PowerSupplyBrand, PowerSupplyName, PowerSupplyWidth, PowerSupplyHeight, PowerSupplyPrice, PowerSupplyImageFilename from
                            dbo.PowerSupplies
                            where PowerSupplyID = @id";

                string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@id", powersupply);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }
            }
            return new JsonResult(table);

        }

        [Route("GetBasicInfo")]
        [HttpGet]
        public JsonResult GetBasicInfo()
        {
            string query = @"
                            select PowerSupplyID, PowerSupplyBrand, PowerSupplyName from
                            dbo.PowerSupplies
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);

        }

    }
}
