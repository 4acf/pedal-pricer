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

        [Authorize]
        [HttpPost]
        public JsonResult Post(List<Pedal> pList)
        {

            foreach (Pedal p in pList)
            {
                string query = @"
                            insert into dbo.Pedals
                            (PedalBrand, PedalName, PedalWidth, PedalHeight, PedalPrice, PedalImageFilename)
                            values (@PedalBrand, @PedalName, @PedalWidth, @PedalHeight, @PedalPrice, @PedalImageFilename)
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@PedalBrand", p.PedalBrand);
                        myCommand.Parameters.AddWithValue("@PedalName", p.PedalName);
                        myCommand.Parameters.AddWithValue("@PedalWidth", p.PedalWidth);
                        myCommand.Parameters.AddWithValue("@PedalHeight", p.PedalHeight);
                        myCommand.Parameters.AddWithValue("@PedalPrice", p.PedalPrice);
                        myCommand.Parameters.AddWithValue("@PedalImageFilename", p.PedalImageFilename);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }
            }

            return new JsonResult("Pedal(s) Posted Successfully");

        }

        [Authorize]
        [HttpPut]

        public JsonResult Put(List<Pedal> pList)
        {
            foreach (Pedal p in pList)
            {
                string query = @"
                            update dbo.Pedals
                            set PedalBrand = @PedalBrand,
                            PedalName = @PedalName,
                            PedalWidth = @PedalWidth,
                            PedalHeight = @PedalHeight,
                            PedalPrice = @PedalPrice,
                            PedalImageFilename = @PedalImageFilename
                            where PedalID = @PedalID 
                            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@PedalID", p.PedalId);
                        myCommand.Parameters.AddWithValue("@PedalBrand", p.PedalBrand);
                        myCommand.Parameters.AddWithValue("@PedalName", p.PedalName);
                        myCommand.Parameters.AddWithValue("@PedalWidth", p.PedalWidth);
                        myCommand.Parameters.AddWithValue("@PedalHeight", p.PedalHeight);
                        myCommand.Parameters.AddWithValue("@PedalPrice", p.PedalPrice);
                        myCommand.Parameters.AddWithValue("@PedalImageFilename", p.PedalImageFilename);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                        myCon.Close();
                    }
                }
            }

            return new JsonResult("Pedal Updated Successfully");

        }

        [Authorize]
        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {

            
            string query = @"
                        delete from dbo.Pedals
                        where PedalID = @PedalID
                        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PedalID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
             }
            

            return new JsonResult("Pedal Deleted Successfully");

        }

        [Authorize]
        [Route("SavePedalImage")]
        [HttpPost]

        public JsonResult SaveFile()
        {

            try
            {

                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Images/PedalImages/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
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
