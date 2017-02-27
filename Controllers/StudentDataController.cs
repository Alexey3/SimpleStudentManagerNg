using Microsoft.AspNetCore.Mvc;
using SimpleStudentManagerNg.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleStudentManagerNg.Controllers
{
	[Route("api/[controller]")]
    public class StudentDataController : Controller
    {
		Database db;

		public StudentDataController(Database db)
		{
			this.db = db;
		}

		[HttpGet("[action]")]
		public IEnumerable<Student> List()
		{
			return db.Students;
		}

		[HttpGet("[action]/{id}")]
		public async Task<Student> Get(int id)
		{
			return await db.Students.FindAsync(id);
		}

		[HttpPost("[action]")]
		public async Task<JsonResult> Save([FromBody]Student student)
		{
			if (!string.IsNullOrEmpty(student.Name))
			{
				if (student.Id > 0)
				{
					var s = await db.Students.FindAsync(student.Id);
					if (s != null)
					{
						s.Name = student.Name;
						s.PhotoUrl = student.PhotoUrl;
					}
				}
				else
					db.Students.Add(student);
				await db.SaveChangesAsync();
			}
			return new JsonResult(student);
		}

		[HttpDelete("[action]/{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var student = await db.Students.FindAsync(id);
			if (student != null)
			{
				db.Students.Remove(student);
				await db.SaveChangesAsync();
			}
			return Ok();
		}
	}
}
