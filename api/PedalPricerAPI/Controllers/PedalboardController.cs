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
    public class PedalboardController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public PedalboardController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]

        public JsonResult Get(string item)
        {

            string[] items = item.Split(',');
            DataTable table = new DataTable();

            foreach (var pedalboard in items)
            {
                string query = @"
                            select PedalboardID, PedalboardBrand, PedalboardName, PedalboardWidth, PedalboardHeight, PedalboardPrice, PedalboardImageFilename from
                            dbo.Pedalboards
                            where PedalboardID = @id";

                string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@id", pedalboard);
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
                            select PedalboardID, PedalboardBrand, PedalboardName from
                            dbo.Pedalboards
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
