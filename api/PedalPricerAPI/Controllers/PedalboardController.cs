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
                            where PedalboardID = '" + pedalboard + "'";

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

        [Authorize]
        [HttpPost]
        public JsonResult Post(List<Pedalboard> pbList)
        {


            foreach (Pedalboard pb in pbList)
            {
                string query = @"
                            insert into dbo.Pedalboards
                            (PedalboardBrand, PedalboardName, PedalboardWidth, PedalboardHeight, PedalboardPrice, PedalboardImageFilename)
                            values (@PedalboardBrand, @PedalboardName, @PedalboardWidth, @PedalboardHeight, @PedalboardPrice, @PedalboardImageFilename)
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@PedalboardBrand", pb.PedalboardBrand);
                        myCommand.Parameters.AddWithValue("@PedalboardName", pb.PedalboardName);
                        myCommand.Parameters.AddWithValue("@PedalboardWidth", pb.PedalboardWidth);
                        myCommand.Parameters.AddWithValue("@PedalboardHeight", pb.PedalboardHeight);
                        myCommand.Parameters.AddWithValue("@PedalboardPrice", pb.PedalboardPrice);
                        myCommand.Parameters.AddWithValue("@PedalboardImageFilename", pb.PedalboardImageFilename);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }
            }

            return new JsonResult("Pedalboard(s) Posted Successfully");

        }

        [Authorize]
        [HttpPut]

        public JsonResult Put(List<Pedalboard> pbList)
        {

            foreach (Pedalboard pb in pbList)
            {
                string query = @"
                            update dbo.Pedalboards
                            set PedalboardBrand = @PedalboardBrand,
                            PedalboardName = @PedalboardName,
                            PedalboardWidth = @PedalboardWidth,
                            PedalboardHeight = @PedalboardHeight,
                            PedalboardPrice = @PedalboardPrice,
                            PedalboardImageFilename = @PedalboardImageFilename
                            where PedalboardID = @PedalboardID 
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@PedalboardID", pb.PedalboardId);
                        myCommand.Parameters.AddWithValue("@PedalboardBrand", pb.PedalboardBrand);
                        myCommand.Parameters.AddWithValue("@PedalboardName", pb.PedalboardName);
                        myCommand.Parameters.AddWithValue("@PedalboardWidth", pb.PedalboardWidth);
                        myCommand.Parameters.AddWithValue("@PedalboardHeight", pb.PedalboardHeight);
                        myCommand.Parameters.AddWithValue("@PedalboardPrice", pb.PedalboardPrice);
                        myCommand.Parameters.AddWithValue("@PedalboardImageFilename", pb.PedalboardImageFilename);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }
            }

            return new JsonResult("Pedalboard Updated Successfully");

        }

        [Authorize]
        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.Pedalboards
                            where PedalboardID = @PedalboardID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PedalboardID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Pedalboard Deleted Successfully");

        }

        [Authorize]
        [Route("SavePedalboardImage")]
        [HttpPost]

        public JsonResult SaveFile()
        {

            try
            {

                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Images/PedalboardImages/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);

            }
            catch (Exception)
            {
                return new JsonResult("default.png");
            }

        }

    }
}
