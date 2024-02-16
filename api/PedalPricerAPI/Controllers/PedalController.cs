using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PedalPricerAPI.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace PedalPricerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedalController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public PedalController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]

        public JsonResult Get(string item)
        {

            //use ',' as delimiter for item string to separate multiple items
            //assumes no item has a comma in it's name
            string[] items = item.Split(',');
            DataTable table = new DataTable();

            foreach (var pedal in items)
            {
          
                string query = @"
                            select PedalID, PedalBrand, PedalName, PedalWidth, PedalHeight, PedalPrice, PedalImageFilename from
                            dbo.Pedals
                            where PedalID = @id";

                
                string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@id", pedal);
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
                            select PedalID, PedalBrand, PedalName from
                            dbo.Pedals
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
