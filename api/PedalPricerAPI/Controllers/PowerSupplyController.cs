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
                            where PowerSupplyID = '" + powersupply + "'";

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

        [Authorize]
        [HttpPost]
        public JsonResult Post(PowerSupply ps)
        {
            string query = @"
                            insert into dbo.PowerSupplies
                            (PowerSupplyBrand, PowerSupplyName, PowerSupplyWidth, PowerSupplyHeight, PowerSupplyPrice, PowerSupplyImageFilename)
                            values (@PowerSupplyBrand, @PowerSupplyName, @PowerSupplyWidth, @PowerSupplyHeight, @PowerSupplyPrice, @PowerSupplyImageFilename)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PowerSupplyBrand", ps.PowerSupplyBrand);
                    myCommand.Parameters.AddWithValue("@PowerSupplyName", ps.PowerSupplyName);
                    myCommand.Parameters.AddWithValue("@PowerSupplyWidth", ps.PowerSupplyWidth);
                    myCommand.Parameters.AddWithValue("@PowerSupplyHeight", ps.PowerSupplyHeight);
                    myCommand.Parameters.AddWithValue("@PowerSupplyPrice", ps.PowerSupplyPrice);
                    myCommand.Parameters.AddWithValue("@PowerSupplyImageFilename", ps.PowerSupplyImageFilename);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Power Supply Posted Successfully");

        }

        [Authorize]
        [HttpPut]

        public JsonResult Put(PowerSupply ps)
        {
            string query = @"
                            update dbo.PowerSupplies
                            set PowerSupplyBrand = @PowerSupplyBrand,
                            PowerSupplyName = @PowerSupplyName,
                            PowerSupplyWidth = @PowerSupplyWidth,
                            PowerSupplyHeight = @PowerSupplyHeight,
                            PowerSupplyPrice = @PowerSupplyPrice,
                            PowerSupplyImageFilename = @PowerSupplyImageFilename
                            where PowerSupplyID = @PowerSupplyID 
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PowerSupplyID", ps.PowerSupplyId);
                    myCommand.Parameters.AddWithValue("@PowerSupplyBrand", ps.PowerSupplyBrand);
                    myCommand.Parameters.AddWithValue("@PowerSupplyName", ps.PowerSupplyName);
                    myCommand.Parameters.AddWithValue("@PowerSupplyWidth", ps.PowerSupplyWidth);
                    myCommand.Parameters.AddWithValue("@PowerSupplyHeight", ps.PowerSupplyHeight);
                    myCommand.Parameters.AddWithValue("@PowerSupplyPrice", ps.PowerSupplyPrice);
                    myCommand.Parameters.AddWithValue("@PowerSupplyImageFilename", ps.PowerSupplyImageFilename);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Power Supply Updated Successfully");

        }

        [Authorize]
        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.PowerSupplies
                            where PowerSupplyID = @PowerSupplyID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PedalAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@PowerSupplyID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Power Supply Deleted Successfully");

        }

        [Authorize]
        [Route("SavePowerSupplyImage")]
        [HttpPost]

        public JsonResult SaveFile()
        {

            try
            {

                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Images/PowerSupplyImages/" + filename;

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
